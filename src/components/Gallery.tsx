import { lazy, Suspense, useState } from "react";
import { Picture } from "@/components/Picture";
import type { ImageName } from "@/lib/images.gen";

// O lightbox só é necessário ao clicar numa foto; carrega o Dialog sob demanda.
const GalleryLightbox = lazy(() => import("./GalleryLightbox"));

export type GalleryItem = {
  image: ImageName;
  alt: string;
  category: string;
};

type Props = {
  items: GalleryItem[];
};

export function Gallery({ items }: Props) {
  const [open, setOpen] = useState<GalleryItem | null>(null);

  return (
    <div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <li key={g.image + g.category}>
            <button
              type="button"
              onClick={() => setOpen(g)}
              className="group relative block w-full overflow-hidden rounded-xl shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`Ampliar foto: ${g.alt}`}
            >
              <Picture
                name={g.image}
                sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
              />
              <span className="absolute inset-x-0 bottom-0 bg-primary/80 px-3 py-2 text-left text-xs font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {g.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <Suspense fallback={null}>
          <GalleryLightbox item={open} onClose={() => setOpen(null)} />
        </Suspense>
      ) : null}
    </div>
  );
}
