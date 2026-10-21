"""Gera versões WebP otimizadas das imagens de public/images em public/images/opt.

Uso: python3 scripts/optimize-images.py

Também escreve src/lib/images.gen.ts com as dimensões e larguras geradas,
usado pelo componente <Picture />. Rode de novo sempre que adicionar ou
trocar uma imagem (e registre-a nas listas abaixo).
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images"
OUT = SRC / "opt"
MANIFEST = ROOT / "src" / "lib" / "images.gen.ts"

# Fotos: várias larguras para srcset.
PHOTOS = {
    "equipe": "equipe.jpeg",
    "munck1": "munck1.jpeg",
    "munck2": "munck2.jpeg",
    "munck3": "munck3.jpeg",
    "munck5": "munck5.jpeg",
    "munck6": "munck6.jpeg",
    "derrubada": "derrubada.jpeg",
    "rocada1": "rocada1.png",
    "rocada": "rocada.jpg",
    "limpeza": "limpeza.jpg",
    "poda-altura": "poda-altura.jpeg",
    "poda-escalada": "poda-escalada.jpg",
}
PHOTO_WIDTHS = (400, 640, 960, 1200)
PHOTO_QUALITY = 60

# Logos: uma única versão, limitada pela altura (2x a maior altura exibida).
LOGOS = {
    "icone3": ("icone3.png", 160),
    "essencis": ("essencis.png", 192),
    "laureano": ("laureano.png", 192),
    "logo-arca": ("logo-arca.png", 192),
    "navalsul": ("navalsul.png", 192),
    "trg-logo": ("trg-logo.png", 192),
    "farm-hill": ("farm-hill.png", 192),
}
LOGO_QUALITY = 85


def load(name: str) -> Image.Image:
    img = ImageOps.exif_transpose(Image.open(SRC / name))
    return img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")


def main() -> None:
    OUT.mkdir(exist_ok=True)
    manifest: dict[str, dict] = {}

    for key, file in PHOTOS.items():
        img = load(file).convert("RGB")
        w, h = img.size
        widths = sorted({min(tw, w) for tw in PHOTO_WIDTHS})
        for tw in widths:
            th = round(h * tw / w)
            img.resize((tw, th), Image.LANCZOS).save(
                OUT / f"{key}-{tw}.webp", "WEBP", quality=PHOTO_QUALITY, method=6
            )
        manifest[key] = {"width": w, "height": h, "widths": widths}

    for key, (file, max_h) in LOGOS.items():
        img = load(file)
        w, h = img.size
        if h > max_h:
            w, h = round(w * max_h / h), max_h
            img = img.resize((w, h), Image.LANCZOS)
        img.save(OUT / f"{key}-{w}.webp", "WEBP", quality=LOGO_QUALITY, method=6)
        manifest[key] = {"width": w, "height": h, "widths": [w]}

    # Favicon pequeno.
    load("icone3.png").resize((64, 64), Image.LANCZOS).save(OUT / "icone3-64.png", optimize=True)

    MANIFEST.write_text(
        "// Gerado por scripts/optimize-images.py — não edite à mão.\n"
        f"export const IMAGES = {json.dumps(manifest, indent=2)} as const;\n\n"
        "export type ImageName = keyof typeof IMAGES;\n"
    )

    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f"{len(list(OUT.iterdir()))} arquivos, {total / 1024:.0f} KiB em {OUT}")


if __name__ == "__main__":
    main()
