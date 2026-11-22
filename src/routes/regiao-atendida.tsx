import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Siren, Truck } from "lucide-react";
import { ServicePage, servicePageHead, DUVIDAS_GERAIS, type Duvida } from "@/components/ServicePage";
import { CIDADES } from "@/lib/company";

const PATH = "/regiao-atendida";

const duvidas: Duvida[] = [
  {
    q: "Atendem fora dessas cidades?",
    a: "Sim, nas demais cidades de Santa Catarina sob orçamento, com visita ao local.",
  },
  ...DUVIDAS_GERAIS.filter((d) => d.q !== "Quais cidades vocês atendem?"),
];

export const Route = createFileRoute("/regiao-atendida")({
  head: () =>
    servicePageHead({
      path: PATH,
      title: "Poda de Árvores em Joinville e Região: Cidades Atendidas | RS Poda",
      description:
        "A RS Poda atende Joinville, Araquari, São Francisco do Sul, Jaraguá do Sul, Barra Velha, Itajaí, Balneário Camboriú e mais cidades de SC com poda, remoção e roçada.",
      serviceName: "Poda de árvores em Joinville e região",
      duvidas,
    }),
  component: () => (
    <ServicePage
      slug="regiao"
      path={PATH}
      hero={{ image: "munck3", alt: "Poda de palmeiras com cesto aéreo em via urbana" }}
      h1="Poda de árvores em Joinville e região"
      intro={`Atendemos ${CIDADES.length} cidades do norte e do litoral de Santa Catarina, e as demais cidades do estado sob orçamento.`}
      destaques={[
        { icon: MapPin, title: `${CIDADES.length} cidades`, text: "Norte e litoral de SC" },
        { icon: Truck, title: "Munck próprio", text: "Vai até o local" },
        { icon: Clock, title: "Seg. a sáb.", text: "Das 7h às 21h" },
        { icon: Siren, title: "Emergência", text: "Árvore com risco: ligue" },
      ]}
      blocos={[
        {
          title: "Cidades atendidas",
          body: (
            <>
              <ul className="grid gap-3 sm:grid-cols-2">
                {CIDADES.map((c) => (
                  <li key={c} className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3">
                    <MapPin aria-hidden="true" className="size-5 shrink-0 text-accent-strong" />
                    <span className="font-semibold text-primary">{c}</span>
                  </li>
                ))}
              </ul>
              <p>Demais cidades de Santa Catarina sob orçamento, com visita ao local.</p>
            </>
          ),
        },
      ]}
      usosTitle="O que fazemos em toda a região"
      usos={[
        { title: "Poda de árvores", text: "Em até 30 metros, inclusive perto da rede elétrica." },
        { title: "Remoção de árvores", text: "De pequeno a grande porte, com munck." },
        { title: "Palmeiras", text: "Poda, limpeza e remoção." },
        { title: "Roçada e limpeza", text: "Terrenos, chácaras, condomínios e empresas." },
      ]}
      fotos={[]}
      duvidasTitle="Dúvidas sobre a região atendida"
      duvidas={duvidas}
    />
  ),
});
