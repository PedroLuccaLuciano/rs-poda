import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, HardHat, Ruler, Zap } from "lucide-react";
import { ServicePage, servicePageHead, DUVIDAS_GERAIS, type Duvida } from "@/components/ServicePage";
import { MENSAGENS } from "@/lib/whatsapp";

const PATH = "/poda-de-arvores";

const duvidas: Duvida[] = [
  {
    q: "Fazem poda perto da rede elétrica?",
    a: "Sim. A poda próxima à rede elétrica é feita com planejamento, isolamento da área, EPIs e descida controlada dos galhos.",
  },
  {
    q: "Fazem limpeza depois da poda?",
    a: "Sim. Recolhemos os galhos e resíduos e entregamos o local organizado.",
  },
  ...DUVIDAS_GERAIS,
];

export const Route = createFileRoute("/poda-de-arvores")({
  head: () =>
    servicePageHead({
      path: PATH,
      title: "Poda de Árvores em Joinville e Região | RS Poda",
      description:
        "Poda de árvores em Joinville, Araquari e região, em até 30 metros de altura, com caminhão munck, cesto aéreo e escalada. Inclusive perto da rede elétrica. Orçamento grátis.",
      serviceName: "Poda de árvores",
      duvidas,
    }),
  component: () => (
    <ServicePage
      slug="poda"
      path={PATH}
      message={MENSAGENS.poda}
      hero={{ image: "munck2", alt: "Poda de pinheiro com o braço do caminhão munck ao lado de um muro" }}
      h1="Poda de árvores em Joinville e região"
      intro="Poda técnica de árvores de pequeno a grande porte, em até 30 metros de altura, com caminhão munck próprio, cesto aéreo e escalada. Atendemos casas, condomínios, comércios e indústrias."
      destaques={[
        { icon: Ruler, title: "Até 30 metros", text: "Munck, cesto e escalada" },
        { icon: Zap, title: "Perto da rede", text: "Com isolamento da área" },
        { icon: HardHat, title: "Equipe com EPIs", text: "5 profissionais próprios" },
        { icon: ClipboardCheck, title: "Visita técnica", text: "Avaliação antes do serviço" },
      ]}
      blocos={[
        {
          title: "Como fazemos a poda",
          body: (
            <>
              <p>
                Primeiro avaliamos a árvore, o acesso e os riscos ao redor, como casa, muro, carro ou
                fiação. Depois escolhemos o método: caminhão munck com cesto aéreo, escalada ou os dois.
              </p>
              <p>
                Os galhos descem de forma controlada, a área fica isolada durante o serviço e, no fim,
                recolhemos os resíduos e deixamos o local organizado.
              </p>
            </>
          ),
        },
      ]}
      usosTitle="Quando chamar a poda"
      usos={[
        { title: "Galhos na rede elétrica", text: "Árvores encostando ou crescendo em direção à fiação." },
        { title: "Risco sobre a casa", text: "Galhos sobre telhado, muro, garagem ou carro." },
        { title: "Árvores muito altas", text: "Copa alta que precisa de munck, cesto ou escalada." },
        { title: "Manutenção", text: "Condomínios, empresas e áreas com muitas árvores." },
      ]}
      fotos={[
        { image: "munck6", alt: "Poda de pinheiro próximo à rede elétrica com a garra do munck", category: "Perto da rede" },
        { image: "munck3", alt: "Poda com cesto aéreo em via urbana", category: "Cesto aéreo" },
        { image: "munck1", alt: "Poda com caminhão munck e braço articulado", category: "Munck" },
      ]}
      duvidasTitle="Dúvidas sobre poda de árvores"
      duvidas={duvidas}
    />
  ),
});
