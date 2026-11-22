import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Leaf, MapPin, Recycle } from "lucide-react";
import { ServicePage, servicePageHead, DUVIDAS_GERAIS, type Duvida } from "@/components/ServicePage";
import { MENSAGENS } from "@/lib/whatsapp";

const PATH = "/rocada-e-limpeza-de-terreno";

const duvidas: Duvida[] = [
  {
    q: "Como é feito o orçamento da roçada?",
    a: "Só por orçamento, sem medir: mande pelo WhatsApp uma foto do terreno e o endereço que respondemos com o valor.",
  },
  {
    q: "Recolhem o mato cortado?",
    a: "Sim. Recolhemos galhos, troncos e o material cortado e entregamos a área organizada. O descarte é combinado no orçamento.",
  },
  ...DUVIDAS_GERAIS.filter((d) => d.q !== "Até que altura vocês trabalham?"),
];

export const Route = createFileRoute("/rocada-e-limpeza-de-terreno")({
  head: () =>
    servicePageHead({
      path: PATH,
      title: "Roçada e Limpeza de Terreno em Joinville e Araquari | RS Poda",
      description:
        "Roçada e limpeza de terrenos em Joinville, Araquari e região: lotes, chácaras, condomínios e áreas industriais. Recolhemos o material cortado. Orçamento grátis pelo WhatsApp.",
      serviceName: "Roçada e limpeza de terreno",
      duvidas,
    }),
  component: () => (
    <ServicePage
      slug="rocada"
      path={PATH}
      message={MENSAGENS.rocada}
      hero={{ image: "rocada1", alt: "Roçada de gramado com roçadeira costal e EPIs" }}
      h1="Roçada e limpeza de terreno em Joinville e região"
      intro="Roçamos lotes, chácaras, condomínios e áreas industriais, e recolhemos galhos, troncos e entulho vegetal, com a área entregue organizada."
      destaques={[
        { icon: Leaf, title: "Roçada", text: "Lotes, chácaras e empresas" },
        { icon: Recycle, title: "Limpeza", text: "Galhos e entulho vegetal" },
        { icon: HardHat, title: "Equipe com EPIs", text: "Roçadeiras profissionais" },
        { icon: MapPin, title: "Joinville e Araquari", text: "E mais 12 cidades" },
      ]}
      blocos={[
        {
          title: "Como funciona",
          body: (
            <p>
              Você manda uma foto do terreno pelo WhatsApp, passamos o orçamento e combinamos o dia. A
              equipe roça o terreno, recolhe o material cortado e deixa a área organizada.
            </p>
          ),
        },
      ]}
      usosTitle="O que fazemos"
      usos={[
        { title: "Terrenos e lotes", text: "Roçada de mato alto em terreno baldio ou à venda." },
        { title: "Chácaras", text: "Roçada de áreas grandes e pastos." },
        { title: "Condomínios e empresas", text: "Manutenção de áreas verdes e pátios." },
        { title: "Retirada de resíduos", text: "Recolhimento de galhos, troncos e entulho vegetal." },
      ]}
      fotos={[{ image: "rocada1", alt: "Roçada de gramado com roçadeira costal e EPIs", category: "Roçada" }]}
      duvidasTitle="Dúvidas sobre roçada e limpeza"
      duvidas={duvidas}
    />
  ),
});
