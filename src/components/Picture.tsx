import type { ImgHTMLAttributes } from "react";
import { IMAGES, type ImageName, type ImageVariant } from "@/lib/images.gen";

// Imagens otimizadas geradas por scripts/optimize-images.py em /images/opt.
// `variant` é o recorte gerado para cada uso (ex.: "card", "square", "hero").
function getVariant(name: ImageName, variant: string): ImageVariant {
  const v = (IMAGES[name] as Record<string, ImageVariant>)[variant];
  if (!v) throw new Error(`Imagem ${name} sem variante "${variant}"`);
  return v;
}

export function imageUrl(name: ImageName, variant: string, width?: number) {
  const v = getVariant(name, variant);
  if (v.file) return `/images/opt/${v.file}`;
  return `/images/opt/${name}-${variant}-${width ?? v.widths[v.widths.length - 1]}.webp`;
}

export function imageSrcSet(name: ImageName, variant: string) {
  return getVariant(name, variant)
    .widths.map((w) => `${imageUrl(name, variant, w)} ${w}w`)
    .join(", ");
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  name: ImageName;
  variant: string;
};

export function Picture({ name, variant, sizes = "100vw", ...rest }: Props) {
  const { width, height, widths } = getVariant(name, variant);
  const multi = widths.length > 1;
  return (
    <img
      src={imageUrl(name, variant)}
      srcSet={multi ? imageSrcSet(name, variant) : undefined}
      sizes={multi ? sizes : undefined}
      width={width}
      height={height}
      {...rest}
    />
  );
}
