import type { ImgHTMLAttributes } from "react";
import { IMAGES, type ImageName } from "@/lib/images.gen";

// Imagens otimizadas geradas por scripts/optimize-images.py em /images/opt.
export function imageUrl(name: ImageName, width?: number) {
  const { widths } = IMAGES[name];
  const w = width ?? widths[widths.length - 1];
  return `/images/opt/${name}-${w}.webp`;
}

export function imageSrcSet(name: ImageName) {
  return IMAGES[name].widths.map((w) => `${imageUrl(name, w)} ${w}w`).join(", ");
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  name: ImageName;
};

export function Picture({ name, sizes = "100vw", ...rest }: Props) {
  const { width, height, widths } = IMAGES[name];
  return (
    <img
      src={imageUrl(name)}
      srcSet={widths.length > 1 ? imageSrcSet(name) : undefined}
      sizes={widths.length > 1 ? sizes : undefined}
      width={width}
      height={height}
      {...rest}
    />
  );
}
