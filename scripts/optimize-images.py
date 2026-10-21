"""Gera versões WebP otimizadas das imagens de public/images em public/images/opt.

Uso: python3 scripts/optimize-images.py

Cada foto é gerada nas "variantes" em que aparece no site, já recortada (pelo
centro, igual ao object-cover) na proporção exibida, para não baixar a foto
inteira só para mostrar uma faixa dela. Também escreve src/lib/images.gen.ts
com as dimensões e larguras geradas, usado pelo componente <Picture />.
Rode de novo sempre que adicionar ou trocar uma imagem (e registre-a abaixo).
"""

import json
import shutil
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images"
OUT = SRC / "opt"
MANIFEST = ROOT / "src" / "lib" / "images.gen.ts"

# aspect = largura / altura do recorte (None = foto inteira).
VARIANTS = {
    # Hero: fica sob um overlay verde de 70%, aguenta compressão alta.
    "hero": {"aspect": None, "widths": (400, 640, 960, 1200), "quality": 40, "blur": 1},
    # Hero no celular: tela em pé, recorte vertical (bem menor que a foto inteira).
    "hero-mobile": {"aspect": 0.6, "widths": (400, 540), "quality": 40, "blur": 1},
    # Foto inteira: lightbox da galeria.
    "full": {"aspect": None, "widths": (400, 640, 960, 1200), "quality": 50},
    # Cards de serviços (h-40, bem largos).
    "card": {"aspect": 2.0, "widths": (400, 640, 800), "quality": 50},
    # Galeria (h-72/h-80, quase quadrado).
    "square": {"aspect": 1.2, "widths": (400, 640, 800), "quality": 50},
    # Antes/depois (h-56/h-64, retrato).
    "portrait": {"aspect": 0.8, "widths": (320, 480, 640), "quality": 50},
    # Fundo da chamada final, exibido com opacidade 20%.
    "bg": {"aspect": None, "widths": (640, 960), "quality": 35, "blur": 2},
}

PHOTOS = {
    "equipe": ("equipe.jpeg", ["hero", "hero-mobile"]),
    "munck1": ("munck1.jpeg", ["square", "full"]),
    "munck2": ("munck2.jpeg", ["square", "full"]),
    "munck3": ("munck3.jpeg", ["square", "full"]),
    "munck5": ("munck5.jpeg", ["card"]),
    "munck6": ("munck6.jpeg", ["square", "full"]),
    "derrubada": ("derrubada.jpeg", ["card", "square", "full"]),
    "rocada1": ("rocada1.png", ["card", "square", "full"]),
    "rocada": ("rocada.jpg", ["portrait"]),
    "limpeza": ("limpeza.jpg", ["portrait"]),
    "poda-altura": ("poda-altura.jpeg", ["portrait"]),
    "poda-escalada": ("poda-escalada.jpg", ["card", "portrait", "bg"]),
}

# Logos: uma versão por altura, ~1,75x a altura exibida no celular.
LOGOS = {
    "icone3": ("icone3.png", [96, 128]),
    "essencis": ("essencis.png", [80]),
    "laureano": ("laureano.png", [104]),
    "logo-arca": ("logo-arca.png", [168]),
    "navalsul": ("navalsul.png", [168]),
    "trg-logo": ("trg-logo.png", [96]),
    "farm-hill": ("farm-hill.png", [168]),
}
LOGO_QUALITY = 60


def load(name: str) -> Image.Image:
    img = ImageOps.exif_transpose(Image.open(SRC / name))
    return img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")


def crop(img: Image.Image, aspect: float | None) -> Image.Image:
    if aspect is None:
        return img
    w, h = img.size
    if w / h > aspect:
        nw = round(h * aspect)
        return img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = round(w / aspect)
    return img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))


def main() -> None:
    shutil.rmtree(OUT, ignore_errors=True)
    OUT.mkdir()
    manifest: dict[str, dict] = {}

    for key, (file, variants) in PHOTOS.items():
        src = load(file).convert("RGB")
        manifest[key] = {}
        for variant in variants:
            spec = VARIANTS[variant]
            img = crop(src, spec["aspect"])
            if spec.get("blur"):
                img = img.filter(ImageFilter.GaussianBlur(spec["blur"]))
            w, h = img.size
            widths = sorted({min(tw, w) for tw in spec["widths"]})
            for tw in widths:
                img.resize((tw, round(h * tw / w)), Image.LANCZOS).save(
                    OUT / f"{key}-{variant}-{tw}.webp", "WEBP", quality=spec["quality"], method=6
                )
            manifest[key][variant] = {"width": w, "height": h, "widths": widths}

    for key, (file, heights) in LOGOS.items():
        src = load(file)
        manifest[key] = {}
        for th in heights:
            w, h = src.size
            if h > th:
                w, h = round(w * th / h), th
            src.resize((w, h), Image.LANCZOS).save(
                OUT / f"{key}-h{th}.webp", "WEBP", quality=LOGO_QUALITY, method=6
            )
            manifest[key][f"h{th}"] = {"width": w, "height": h, "widths": [w], "file": f"{key}-h{th}.webp"}

    # Favicon pequeno.
    load("icone3.png").resize((64, 64), Image.LANCZOS).save(OUT / "icone3-64.png", optimize=True)

    MANIFEST.write_text(
        "// Gerado por scripts/optimize-images.py — não edite à mão.\n"
        "export type ImageVariant = { width: number; height: number; widths: number[]; file?: string };\n\n"
        "export const IMAGES = "
        + json.dumps(manifest, indent=2)
        + " satisfies Record<string, Record<string, ImageVariant>>;\n\n"
        "export type ImageName = keyof typeof IMAGES;\n"
    )

    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f"{len(list(OUT.iterdir()))} arquivos, {total / 1024:.0f} KiB em {OUT}")


if __name__ == "__main__":
    main()
