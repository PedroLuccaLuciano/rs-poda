import { WhatsAppButton } from "./WhatsAppButton";
import { Picture } from "./Picture";
import type { ImageName } from "@/lib/images.gen";

export type BeforeAfterItem = {
  title: string;
  before: ImageName;
  after: ImageName;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfter({ items }: { items: BeforeAfterItem[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <h3 className="text-lg font-bold text-primary">{item.title}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {(
              [
                { label: "Antes", image: item.before, alt: item.beforeAlt },
                { label: "Depois", image: item.after, alt: item.afterAlt },
              ] as const
            ).map((side) => (
              <figure key={side.label} className="relative overflow-hidden rounded-xl">
                <Picture
                  name={side.image}
                  variant="portrait"
                  sizes="(min-width: 1024px) 260px, calc(50vw - 42px)"
                  alt={side.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
                />
                <figcaption className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                  {side.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </article>
      ))}

      <div className="lg:col-span-2 flex justify-center">
        <WhatsAppButton location="antes_depois" size="xl">
          Pedir orçamento no WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
