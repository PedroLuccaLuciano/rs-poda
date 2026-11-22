import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, HardHat, Ruler, Truck } from "lucide-react";
import { ServicePage, servicePageHead, DUVIDAS_GERAIS, type Duvida } from "@/components/ServicePage";

const PATH = "/poda-e-remocao-de-palmeiras";

const duvidas: Duvida[] = [
  {
    q: "Fazem limpeza de palmeira, tirando as folhas secas e os cachos?",
    a: "Sim. Tiramos folhas secas, cachos e frutos que podem cair, e recolhemos tudo no fim do serviço.",
  },
  {
    q: "Removem palmeiras altas?",
    a: "Sim. Com o caminhão munck e escalada, a palmeira é cortada em partes, que descem presas até o caminhão.",
  },
  ...DUVIDAS_GERAIS,
];

export const Route = createFileRoute("/poda-e-remocao-de-palmeiras")({
  head: () =>
    servicePageHead({
      path: PATH,
      title: "Poda e Remoção de Palmeiras em Joinville | RS Poda",
      description:
        "Poda, limpeza e remoção de palmeiras em Joinville e região, com caminhão munck e escalada, em até 30 metros. Recolhemos as folhas e os troncos. Orçamento grátis.",
      serviceName: "Poda e remoção de palmeiras",
      duvidas,
    }),
  component: () => (
    <ServicePage
      slug="palmeiras"
      path={PATH}
      hero={{ image: "palmeira-escalada", alt: "Profissional no alto de uma palmeira ao lado da lança do munck" }}
      h1="Poda e remoção de palmeiras em Joinville e região"
      intro="Limpamos, podamos e removemos palmeiras altas com caminhão munck e escalada. As partes descem presas e recolhemos tudo no fim."
      destaques={[
        { icon: Ruler, title: "Até 30 metros", text: "Munck e escalada" },
        { icon: Truck, title: "Munck próprio", text: "Partes descem presas" },
        { icon: HardHat, title: "Equipe com EPIs", text: "Área isolada na rua" },
        { icon: ClipboardCheck, title: "Visita técnica", text: "Quando o serviço exige" },
      ]}
      blocos={[
        {
          title: "Poda ou remoção",
          body: (
            <>
              <p>
                Na <strong>poda</strong>, tiramos as folhas secas, os cachos e os frutos que podem cair
                em pessoas, carros ou no telhado.
              </p>
              <p>
                Na <strong>remoção</strong>, a palmeira é cortada de cima para baixo e cada parte desce
                presa ao munck até o caminhão. Se for preciso autorização da prefeitura, ajudamos a pedir
                na SAMA.
              </p>
            </>
          ),
        },
      ]}
      usosTitle="Quando chamar"
      usos={[
        { title: "Folhas e cachos secos", text: "Risco de cair em quem passa ou em carros." },
        { title: "Palmeira perto da casa", text: "Folhas batendo no telhado ou na fiação." },
        { title: "Palmeira doente ou morta", text: "Remoção antes que caia." },
        { title: "Condomínios e empresas", text: "Manutenção de várias palmeiras de uma vez." },
      ]}
      fotos={[
        { image: "palmeira-caminhao", alt: "Caminhão munck da RS Poda posicionado ao lado de palmeiras altas", category: "Palmeiras" },
        { image: "palmeira-folhas", alt: "Munck colocando folhas de palmeira no caminhão", category: "Palmeiras" },
        { image: "palmeira-escalada", alt: "Profissional no alto de uma palmeira ao lado da lança do munck", category: "Palmeiras" },
        { image: "munck3", alt: "Poda de palmeiras com cesto aéreo em via urbana", category: "Palmeiras" },
        { image: "munck1", alt: "Poda de palmeira com caminhão munck e braço articulado", category: "Palmeiras" },
      ]}
      duvidasTitle="Dúvidas sobre palmeiras"
      duvidas={duvidas}
    />
  ),
});
