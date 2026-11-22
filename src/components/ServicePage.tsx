import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PhoneButton } from "@/components/PhoneButton";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import { Picture } from "@/components/Picture";
import type { ImageName } from "@/lib/images.gen";
import { initAnalytics } from "@/lib/analytics";
import { COMPANY, CIDADES } from "@/lib/company";
import { MENSAGENS } from "@/lib/whatsapp";

const SITE = "https://rspoda.com.br";

export type Duvida = { q: string; a: string };

export const SERVICOS_LINKS = [
  { to: "/poda-de-arvores", label: "Poda de árvores" },
  { to: "/remocao-de-arvores", label: "Remoção de árvores" },
  { to: "/poda-e-remocao-de-palmeiras", label: "Poda e remoção de palmeiras" },
  { to: "/rocada-e-limpeza-de-terreno", label: "Roçada e limpeza de terreno" },
  { to: "/autorizacao-para-corte-de-arvore", label: "Autorização para corte" },
  { to: "/regiao-atendida", label: "Região atendida" },
] as const;

/** Respostas comuns: preço, altura, emergência, descarte e cidades. */
export const DUVIDAS_GERAIS: Duvida[] = [
  {
    q: "Quanto custa?",
    a: "Trabalhamos só por orçamento, sem compromisso. Mande pelo WhatsApp uma foto da árvore ou do terreno e o endereço; quando precisa, fazemos uma visita técnica antes de passar o valor.",
  },
  {
    q: "Até que altura vocês trabalham?",
    a: "Até 30 metros de altura, com caminhão munck próprio, cesto aéreo e técnicas de escalada.",
  },
  {
    q: "Atendem emergência?",
    a: `Sim, quando necessário, como árvore caída ou com risco de queda. Nosso horário normal é ${COMPANY.hours.toLowerCase()}. Em emergência, ligue.`,
  },
  {
    q: "O descarte está incluso?",
    a: "A limpeza da área faz parte do serviço. O descarte dos galhos e troncos é definido no orçamento, conforme o volume e a distância do destino.",
  },
  {
    q: "Quais cidades vocês atendem?",
    a: `${CIDADES.join(", ")}. Demais cidades de Santa Catarina sob orçamento.`,
  },
];

/** Título, descrição, canonical e dados estruturados (Service + FAQPage). */
export function servicePageHead(opts: {
  path: string;
  title: string;
  description: string;
  serviceName: string;
  duvidas: Duvida[];
}) {
  const url = `${SITE}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: opts.serviceName,
          url,
          provider: { "@type": "LocalBusiness", name: COMPANY.name, url: `${SITE}/` },
          areaServed: CIDADES.map((c) => ({ "@type": "City", name: c })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: opts.duvidas.map((d) => ({
            "@type": "Question",
            name: d.q,
            acceptedAnswer: { "@type": "Answer", text: d.a },
          })),
        }),
      },
    ],
  };
}

type Props = {
  slug: string;
  path: string;
  hero: { image: ImageName; alt: string };
  h1: string;
  intro: string;
  /** Mensagem do WhatsApp específica do serviço. */
  message?: string;
  destaques: { icon: LucideIcon; title: string; text: string }[];
  blocos: { title: string; body: ReactNode }[];
  usosTitle: string;
  usos: { title: string; text: string }[];
  fotos: GalleryItem[];
  duvidasTitle: string;
  duvidas: Duvida[];
};

export function ServicePage(p: Props) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingWhatsApp />

      <main>
        {/* TOPO */}
        <section className="relative isolate overflow-hidden pt-20">
          <Picture
            name={p.hero.image}
            variant="full"
            sizes="100vw"
            alt={p.hero.alt}
            fetchPriority="high"
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-primary/80" />
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">RS Poda</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-primary-foreground sm:text-5xl">
              {p.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/90">{p.intro}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton location={`${p.slug}_topo`} size="xl" message={p.message ?? MENSAGENS.geral}>
                Pedir orçamento gratuito
              </WhatsAppButton>
              <PhoneButton location={`${p.slug}_topo_ligar`} size="xl">
                Ligar agora
              </PhoneButton>
            </div>
          </div>
        </section>

        {/* RESUMO */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.destaques.map((i) => (
              <li key={i.title} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
                <i.icon aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-strong" />
                <div>
                  <p className="font-bold text-primary">{i.title}</p>
                  <p className="text-sm text-muted-foreground">{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* BLOCOS DE TEXTO */}
        {p.blocos.map((b, idx) => (
          <section key={b.title} className={idx % 2 === 0 ? "bg-secondary py-16" : "py-16"}>
            <div className="mx-auto max-w-3xl px-4">
              <h2 className="text-3xl font-extrabold text-primary">{b.title}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground">{b.body}</div>
            </div>
          </section>
        ))}

        {/* USOS + FOTOS */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold text-primary">{p.usosTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {p.usos.map((u) => (
              <li key={u.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-bold text-primary">{u.title}</h3>
                <p className="mt-1 text-muted-foreground">{u.text}</p>
              </li>
            ))}
          </ul>
          {p.fotos.length > 0 && <Gallery items={p.fotos} />}
        </section>

        {/* PREÇO */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-extrabold text-primary-foreground">Quanto custa</h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Trabalhamos só por orçamento, sem compromisso. Mande pelo WhatsApp uma foto e o endereço
              que respondemos com o valor. Quando precisa, fazemos uma visita técnica antes.
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton location={`${p.slug}_preco`} size="xl" message={p.message ?? MENSAGENS.geral}>
                Pedir orçamento no WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* DÚVIDAS (respostas visíveis no texto da página) */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-3xl font-extrabold text-primary">{p.duvidasTitle}</h2>
          <dl className="mt-8 space-y-4">
            {p.duvidas.map((d) => (
              <div key={d.q} className="rounded-xl border border-border bg-card p-5">
                <dt className="font-bold text-primary">{d.q}</dt>
                <dd className="mt-2 leading-relaxed text-foreground">{d.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* OUTROS SERVIÇOS */}
        <nav aria-label="Outros serviços" className="bg-secondary py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-extrabold text-primary">Outros serviços da RS Poda</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {SERVICOS_LINKS.filter((s) => s.to !== p.path).map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="inline-block rounded-full border border-border bg-card px-4 py-2 font-semibold text-primary transition-colors hover:border-accent"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link to="/" className="font-semibold text-primary underline">
                Voltar para a página inicial
              </Link>
            </p>
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
