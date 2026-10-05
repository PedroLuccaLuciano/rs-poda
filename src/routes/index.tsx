import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PhoneButton } from "@/components/PhoneButton";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "@/components/ui/carousel";
import { BeforeAfter } from "@/components/BeforeAfter";
import { initAnalytics, trackWhatsAppClick } from "@/lib/analytics";
import { QuoteForm } from "@/components/QuoteForm";
import { MENSAGENS, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/whatsapp";
import { COMPANY, CIDADES } from "@/lib/company";
import podaAltura from "@/assets/poda-altura.jpeg.asset.json";
import equipe from "@/assets/equipe.jpeg.asset.json";
import podaEscalada from "@/assets/poda-escalada.jpg.asset.json";
import rocada from "@/assets/rocada.jpg.asset.json";
import limpeza from "@/assets/limpeza.jpg.asset.json";
import {
  Axe,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Clock,
  Cone,
  HardHat,
  Leaf,
  MapPin,
  Phone,
  Recycle,
  Ruler,
  ShieldCheck,
  Siren,
  TreeDeciduous,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Poda de Árvores em Joinville | RS Poda — Remoção e Roçada",
      },
      {
        name: "description",
        content:
          "Empresa de poda de árvores em Joinville e Araquari: poda em altura, remoção de árvores e roçada de terrenos. Equipe com EPIs e motosserras STIHL. Orçamento gratuito no WhatsApp.",
      },
      {
        property: "og:title",
        content: "Poda de Árvores, Remoção e Roçada em Joinville | RS Poda",
      },
      {
        property: "og:description",
        content:
          "Poda em altura, remoção de árvores e roçada de terrenos em Joinville, Araquari e região. Orçamento gratuito pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rspoda.com.br/" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "RS Poda" },
      { property: "og:image", content: `https://rspoda.com.br${equipe.url}` },
      { property: "og:image:alt", content: "Equipe da RS Poda em serviço de poda de árvores em Joinville" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://rspoda.com.br${equipe.url}` },
    ],
    links: [
      { rel: "canonical", href: "https://rspoda.com.br/" },
      { rel: "preload", as: "image", href: equipe.url, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "RS Poda",
          description:
            "Poda de árvores, remoção de árvores, roçada e serviços ambientais em Joinville, Araquari e região norte de Santa Catarina.",
          url: "https://rspoda.com.br",
          image: `https://rspoda.com.br${equipe.url}`,
          telephone: "+5547999439286",
          taxID: COMPANY.cnpj,
          address: {
            "@type": "PostalAddress",
            streetAddress: "R. Olga Trusz Sboinski, 130",
            addressLocality: "Joinville",
            addressRegion: "SC",
            postalCode: "89209-275",
            addressCountry: "BR",
          },
          areaServed: CIDADES.map((c) => ({ "@type": "City", name: c })),
          openingHours: "Mo-Su 00:00-23:59",
          geo: {
            "@type": "GeoCoordinates",
            latitude: -26.357807854289053,
            longitude: -48.80543346260826,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSchema(),
        }),
      },
    ],
  }),
  component: Index,
});

const servicos = [
  { key: "poda", icon: TreeDeciduous, image: "/images/munck5.jpeg", title: "Poda de árvores em Joinville", text: "Poda técnica em qualquer altura com cesto aéreo e caminhão munck, inclusive próximo à rede elétrica.", msg: MENSAGENS.poda },
  { key: "remocao", icon: Axe, image: "/images/derrubada.jpeg", title: "Remoção de árvores", text: "Derrubada segura de árvores de pequeno a grande porte, com equipe treinada, EPIs e, quando necessário, munck e cesto aéreo.", msg: MENSAGENS.remocao },
  { key: "rocada", icon: Leaf, image: "/images/rocada1.png", title: "Roçada de terrenos", text: "Roçada em Joinville e Araquari: lotes, chácaras, condomínios e áreas industriais.", msg: MENSAGENS.rocada },
  { key: "limpeza", icon: Recycle, image: podaEscalada.url, title: "Limpeza e retirada de resíduos", text: "Recolhimento de galhos, troncos e entulho vegetal, com a área entregue varrida e organizada.", msg: MENSAGENS.limpeza },
];
const provaSocial = [
  { icon: BadgeCheck, title: "Empresa registrada", text: `CNPJ ${COMPANY.cnpj}` },
  { icon: Users, title: "Equipe com 5 profissionais", text: "Time próprio, uniformizado e treinado." },
  { icon: Ruler, title: "Atendimento em até 30 metros de altura", text: "Cesto aéreo, escalada e munck." },
  { icon: ClipboardCheck, title: "Visita técnica", text: "Avaliação no local antes da execução." },
  { icon: Truck, title: "Caminhão munck próprio", text: "Sem depender de terceiros." },
  { icon: HardHat, title: "EPIs completos", text: "Capacete, cinto, luvas e protetores em toda a equipe." },
];

const clientes = [
  { src: "/images/essencis.png", alt: "Essencis Catarinense" },
  { src: "/images/laureano.png", alt: "Laureano" },
  { src: "/images/logo-arca.png", alt: "Arca", tall: true },
  { src: "/images/navalsul.png", alt: "Naval Sul", tall: true },
  { src: "/images/trg-logo.png", alt: "TRG" },
  { src: "/images/farm-hill.png", alt: "Farm Hill", tall: true },
];

const numeros = [
  { icon: MapPin, value: "Joinville", label: "e região norte de SC" },
  { icon: TreeDeciduous, value: "Poda, remoção e roçada", label: "serviços executados" },
  { icon: Truck, value: "Munck próprio", label: "caminhão da própria equipe" },
];

const diferenciais = [
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    text: "Isolamento da área, sinalização e procedimentos de trabalho em altura.",
  },
  {
    icon: HardHat,
    title: "EPIs completos",
    text: "Capacete, cinto, protetores e uniforme em toda a equipe, sem exceção.",
  },
  {
    icon: BadgeCheck,
    title: "Motosserras STIHL",
    text: "Equipamentos profissionais revisados, com corte limpo e menor risco.",
  },
  {
    icon: Building2,
    title: "Residências e empresas",
    text: "Atendimento para casas, condomínios, comércios e indústrias.",
  },
];

const seguranca = [
  { icon: HardHat, title: "Utilização de EPIs", text: "Capacete, cinto, luvas, protetor auricular e facial." },
  { icon: Wrench, title: "Equipamentos revisados", text: "Manutenção preventiva antes de cada serviço." },
  { icon: Axe, title: "Motosserras profissionais STIHL", text: "Ferramentas de linha profissional." },
  { icon: ClipboardCheck, title: "Planejamento antes da execução", text: "Análise da árvore, do local e dos riscos." },
  { icon: Cone, title: "Isolamento da área", text: "Sinalização e controle de circulação durante o trabalho." },
  { icon: ShieldCheck, title: "Segurança da equipe e do cliente", text: "Proteção do patrimônio e das pessoas no entorno." },
];

const galeria: GalleryItem[] = [
  { src: "/images/munck1.jpeg", alt: "Poda de palmeira com caminhão munck e braço articulado", category: "Poda com munck" },
  { src: "/images/munck2.jpeg", alt: "Poda de pinheiro com braço do munck ao lado de muro", category: "Poda com munck" },
  { src: "/images/munck3.jpeg", alt: "Poda de palmeiras com cesto aéreo em via urbana", category: "Poda com cesto aéreo" },
  { src: "/images/munck6.jpeg", alt: "Poda de pinheiro próximo à rede elétrica com garra do munck", category: "Poda com munck" },
  { src: "/images/derrubada.jpeg", alt: "Remoção de árvores por equipe com EPIs em área pública", category: "Remoção" },
  { src: "/images/rocada1.png", alt: "Roçada de gramado com roçadeira costal e EPIs", category: "Roçada" },
];

const antesDepois = [
  {
    title: "Árvore sobre a rede elétrica → poda finalizada",
    before: rocada.url,
    after: limpeza.url,
    beforeAlt: "Pinheiro alto encostando na rede elétrica, com caminhão munck posicionado",
    afterAlt: "Árvore após a poda, com o munck ao lado",
  },
  {
    title: "Terreno com mato alto → área roçada",
    before: podaAltura.url,
    after: podaEscalada.url,
    beforeAlt: "Terreno com vegetação densa e caminhão munck antes da limpeza",
    afterAlt: "Terreno limpo após a remoção da vegetação",
  },
];

const faq = [
  {
    q: "Fazem poda em qualquer altura?",
    a: "Não. Trabalhamos com caminhão munck, cesto aéreo e técnicas de escalada, o que permite atender árvores de pequeno, médio e grande porte até 30 metros de altura. Árvores muito altas ou com acesso difícil podem exigir avaliação técnica.",
  },
  {
    q: "Trabalham próximos à rede elétrica?",
    a: "Sim. A poda próxima à rede elétrica é feita com planejamento, isolamento da área, EPIs e descida controlada dos galhos.",
  },
  {
    q: "Atendem empresas?",
    a: "Atendemos residências, condomínios, comércios, indústrias e áreas rurais em Joinville, Araquari e região.",
  },
  {
    q: "Fazem visita técnica?",
    a: "Sim. Quando o serviço exige avaliação presencial, agendamos uma visita técnica para medir riscos, acessos e definir o método de trabalho.",
  },
  {
    q: "Fazem limpeza após o serviço?",
    a: "Sim. A limpeza da área faz parte do serviço: recolhemos galhos e resíduos e entregamos o local organizado.",
  },
  {
    q: "O descarte está incluso?",
    a: "O descarte é definido no orçamento, de acordo com o volume de material e a distância do destino.",
  },
  {
    q: "Fazem atendimento emergencial?",
    a: "Sim, realizamos atendimento emergencial quando necessário, como árvores caídas ou com risco iminente de queda.",
  },
  {
    q: "Quanto tempo demora para executar o serviço?",
    a: "Depende do porte da árvore e do acesso ao local. Muitos serviços são concluídos no mesmo dia; o prazo exato é informado no orçamento.",
  },
];

function faqSchema() {
  return faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
}

function Index() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div id="topo" className="min-h-screen bg-background pb-[4.5rem] sm:pb-0">
      <Header />
      <FloatingWhatsApp />

      <main>
        {/* HERO */}
        <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-20">
          <img
            src={equipe.url}
            alt="Equipe da RS Poda com caminhão munck ao lado de árvores em Joinville"
            width={1200}
            height={1600}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 size-full scale-105 object-cover object-[center_65%]"
          />
          <div className="absolute inset-0 -z-10 bg-primary/70" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/90 via-primary/55 to-transparent" />
            

          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold text-primary-foreground backdrop-blur sm:text-sm">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
                Atendimento em Joinville e região. Emergência: ligue.
              </p>

              <h1 className="mt-5 text-3xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
                Poda de Árvores, Remoção de Árvores e Roçada em Joinville e Região
              </h1>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <WhatsAppButton location="hero" size="xl">
              Pedir orçamento no WhatsApp
            </WhatsAppButton>
                <PhoneButton location="hero" variant="outlineLight" size="xl">
                  Ligar agora
                </PhoneButton>
              </div>

              <dl className="mt-8 grid gap-4 text-sm text-primary-foreground/90 sm:grid-cols-3 text-left">
                <div className="flex items-start gap-2">
                  <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">WhatsApp</dt>
                    <dd>{WHATSAPP_DISPLAY}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">Atendimento</dt>
                    <dd>{COMPANY.hours}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Siren aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">Emergência</dt>
                    <dd>{COMPANY.emergencia}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section id="por-que" className="mx-auto max-w-6xl px-4 py-20">
          <header className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-accent-text">Confiança</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              Por que escolher a RS Poda?
            </h2>
          </header>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {provaSocial.map((p) => (
              <li
                key={p.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
              >
                <p.icon aria-hidden="true" className="size-6 shrink-0 text-accent" />
                <div>
                  <h3 className="text-base font-bold text-primary">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CLIENTES */}
        <section id="clientes" className="bg-secondary py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-primary sm:text-3xl">
              Conheça alguns dos nossos clientes
            </h2>
            <Carousel opts={{ align: "center", loop: true }} className="mt-10">
              <CarouselContent>
                {clientes.map((c) => (
                  <CarouselItem
                    key={c.alt}
                    className="basis-1/2 sm:basis-1/3 lg:basis-1/5"
                  >
                    <div className="flex h-28 items-center justify-center px-4">
                      <img
                        src={c.src}
                        alt={c.alt}
                        loading="lazy"
                        decoding="async"
                        className={`w-auto max-w-full object-contain ${c.tall ? "max-h-24" : "max-h-16"}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-1/2" />
              <CarouselNext className="right-0 translate-x-1/2" />
            </Carousel>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="mx-auto max-w-6xl px-4 py-20">
          <header className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-accent-text">Serviços</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              Poda, remoção e roçada em Joinville e Araquari
            </h2>
          </header>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicos.map((s) => (
              <li
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden="true"
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-xl bg-card shadow-card">
                    <s.icon aria-hidden="true" className="size-6 text-accent" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  <a
                    href={whatsappUrl(s.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`servico_${s.key}`)}
                    className="mt-auto self-start pt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Pedir orçamento →
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <WhatsAppButton location="apos_servicos" size="xl">
              Pedir orçamento no WhatsApp
            </WhatsAppButton>
          </div>
        </section>

        {/* ANTES E DEPOIS */}
        <section id="antes-depois" className="bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-4">
            <header className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-accent-text">Resultados</p>
              <h2 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
                Veja o resultado dos nossos serviços
              </h2>
            </header>
            <div className="mt-10">
              <BeforeAfter items={antesDepois} />
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="trabalhos" className="mx-auto max-w-6xl px-4 py-20">
          <header className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-accent-text">Galeria</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              Serviços executados pela nossa equipe
            </h2>
          </header>

          <div className="mt-8">
            <Gallery
              items={galeria}
              
            />
          </div>

          <div className="mt-10 flex justify-center">
            <WhatsAppButton location="apos_galeria" size="xl">
              Pedir orçamento no WhatsApp
            </WhatsAppButton>
          </div>
        </section>

        {/* ÁREA DE ATENDIMENTO */}
        <section id="area" className="mx-auto max-w-6xl px-4 py-20">
          <header className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-accent-text">
              Área de atendimento
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              Atendemos toda a região Norte de Santa Catarina
            </h2>
            <p className="mt-3 text-muted-foreground">
              Atendimento em cidades em um raio aproximado de 40 km.
            </p>
          </header>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CIDADES.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
              >
                <MapPin aria-hidden="true" className="size-5 shrink-0 text-accent" />
                <span className="font-semibold text-primary">{c}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <WhatsAppButton location="antes_faq" size="xl">
              Pedir orçamento no WhatsApp
            </WhatsAppButton>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-secondary py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Dúvidas frequentes</h2>
            <Accordion type="single" collapsible className="mt-8">
              {faq.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base font-semibold text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="relative isolate overflow-hidden bg-primary py-24">
          <img
            src={podaEscalada.url}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 size-full object-cover opacity-20"
          />
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-5xl">
              Solicite um orçamento gratuito agora mesmo.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Escolha o serviço, informe o local e o dia. Abrimos o WhatsApp já com tudo preenchido.
            </p>
            <div className="mt-9">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}