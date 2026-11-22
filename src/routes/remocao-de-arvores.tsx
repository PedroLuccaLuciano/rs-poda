import { createFileRoute } from "@tanstack/react-router";
import { Axe, FileCheck, HardHat, Truck } from "lucide-react";
import { ServicePage, servicePageHead, DUVIDAS_GERAIS, type Duvida } from "@/components/ServicePage";
import { MENSAGENS } from "@/lib/whatsapp";

const PATH = "/remocao-de-arvores";

const duvidas: Duvida[] = [
  {
    q: "Precisa de autorização para cortar a árvore?",
    a: "Em Joinville, muitas vezes sim: depende da espécie e de onde a árvore está. Nós ajudamos você a pedir a autorização na SAMA, a secretaria de meio ambiente da prefeitura.",
  },
  {
    q: "Tiram a árvore inteira, com o tronco?",
    a: "Sim. A árvore é derrubada em partes, de forma controlada, e os galhos e troncos são recolhidos. O descarte é combinado no orçamento.",
  },
  ...DUVIDAS_GERAIS,
];

export const Route = createFileRoute("/remocao-de-arvores")({
  head: () =>
    servicePageHead({
      path: PATH,
      title: "Remoção e Corte de Árvores em Joinville | RS Poda",
      description:
        "Remoção e corte de árvores em Joinville e região, de pequeno a grande porte, com munck, cesto aéreo e equipe com EPIs. Ajudamos a pedir a autorização na SAMA. Orçamento grátis.",
      serviceName: "Remoção de árvores",
      duvidas,
    }),
  component: () => (
    <ServicePage
      slug="remocao"
      path={PATH}
      message={MENSAGENS.remocao}
      hero={{ image: "derrubada", alt: "Equipe com EPIs fazendo a remoção de uma árvore" }}
      h1="Remoção e corte de árvores em Joinville e região"
      intro="Derrubada segura de árvores de pequeno a grande porte, em partes e de forma controlada, com equipe treinada, EPIs e, quando precisa, caminhão munck e cesto aéreo."
      destaques={[
        { icon: Axe, title: "Pequeno a grande porte", text: "Derrubada em partes" },
        { icon: Truck, title: "Munck próprio", text: "Para descer troncos pesados" },
        { icon: FileCheck, title: "Autorização", text: "Ajudamos a pedir na SAMA" },
        { icon: HardHat, title: "Equipe com EPIs", text: "Área isolada e sinalizada" },
      ]}
      blocos={[
        {
          title: "Como fazemos a remoção",
          body: (
            <>
              <p>
                A árvore é cortada de cima para baixo, em partes. Com o caminhão munck, as partes
                pesadas descem presas, sem cair sobre casa, muro ou fiação.
              </p>
              <p>
                Antes do corte, vemos com você se é preciso autorização da prefeitura. Se for, ajudamos
                a pedir na SAMA.
              </p>
            </>
          ),
        },
      ]}
      usosTitle="Quando remover a árvore"
      usos={[
        { title: "Árvore com risco de queda", text: "Tronco inclinado, oco ou com raiz levantando." },
        { title: "Árvore caída", text: "Atendimento emergencial quando necessário." },
        { title: "Obra ou construção", text: "Árvore no lugar onde vai ser construído." },
        { title: "Árvore morta", text: "Árvore seca ou doente que pode cair." },
      ]}
      fotos={[
        { image: "derrubada", alt: "Remoção de árvores por equipe com EPIs em área pública", category: "Remoção" },
        { image: "munck6", alt: "Garra do munck segurando parte de um pinheiro perto da rede elétrica", category: "Munck" },
        { image: "palmeira-folhas", alt: "Munck retirando partes de uma palmeira para o caminhão", category: "Palmeiras" },
      ]}
      duvidasTitle="Dúvidas sobre remoção de árvores"
      duvidas={duvidas}
    />
  ),
});
