import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, FileCheck, HelpCircle, Siren } from "lucide-react";
import { ServicePage, servicePageHead, DUVIDAS_GERAIS, type Duvida } from "@/components/ServicePage";
import { MENSAGENS } from "@/lib/whatsapp";

const PATH = "/autorizacao-para-corte-de-arvore";

const duvidas: Duvida[] = [
  {
    q: "Preciso de autorização para cortar árvore em Joinville?",
    a: "Muitas vezes sim. Depende da espécie da árvore e de onde ela está, por exemplo se é nativa, se fica em área de preservação ou na calçada. Quem autoriza é a SAMA, a secretaria de meio ambiente da Prefeitura de Joinville.",
  },
  {
    q: "Vocês pedem a autorização para mim?",
    a: "Nós ajudamos você a pedir. Avaliamos a árvore, ajudamos com o pedido na SAMA e, com a autorização, fazemos o corte.",
  },
  {
    q: "E se a árvore estiver caindo?",
    a: "Em caso de risco, ligue para nós. Atendemos emergência quando necessário, como árvore caída ou com risco iminente de queda.",
  },
  {
    q: "E a poda, também precisa de autorização?",
    a: "Depende do caso. Na avaliação dizemos se a poda pode ser feita direto ou se é melhor consultar a SAMA antes.",
  },
  ...DUVIDAS_GERAIS.filter((d) => d.q !== "Atendem emergência?"),
];

export const Route = createFileRoute("/autorizacao-para-corte-de-arvore")({
  head: () =>
    servicePageHead({
      path: PATH,
      title: "Autorização para Cortar Árvore em Joinville: Ajudamos a Pedir na SAMA | RS Poda",
      description:
        "Precisa de autorização para cortar árvore em Joinville? Depende da espécie e do local. A RS Poda avalia a árvore, ajuda a pedir a autorização na SAMA e faz o corte com segurança.",
      serviceName: "Corte de árvore com apoio na autorização da SAMA",
      duvidas,
    }),
  component: () => (
    <ServicePage
      slug="autorizacao"
      path={PATH}
      message={MENSAGENS.remocao}
      hero={{ image: "derrubada", alt: "Equipe da RS Poda com EPIs fazendo o corte de uma árvore" }}
      h1="Autorização para cortar árvore em Joinville"
      intro="Em Joinville, o corte de árvore muitas vezes depende de autorização da SAMA, a secretaria de meio ambiente da prefeitura. A RS Poda avalia a árvore, ajuda você a pedir a autorização e faz o corte com segurança."
      destaques={[
        { icon: HelpCircle, title: "Precisa ou não?", text: "Avaliamos o seu caso" },
        { icon: FileCheck, title: "Pedido na SAMA", text: "Ajudamos a pedir" },
        { icon: ClipboardCheck, title: "Visita técnica", text: "Quando o caso exige" },
        { icon: Siren, title: "Emergência", text: "Árvore com risco: ligue" },
      ]}
      blocos={[
        {
          title: "Como ajudamos",
          body: (
            <>
              <p>
                <strong>1. Avaliação.</strong> Vemos a árvore, a espécie e onde ela está: dentro do
                terreno, na calçada ou perto de área de preservação.
              </p>
              <p>
                <strong>2. Autorização.</strong> Se for preciso, ajudamos você a pedir a autorização na
                SAMA.
              </p>
              <p>
                <strong>3. Corte.</strong> Com a autorização, fazemos o corte em partes, com caminhão
                munck, cesto aéreo e equipe com EPIs, e recolhemos o material.
              </p>
              <p>
                As regras são da prefeitura e podem mudar. Na dúvida, confirmamos com a SAMA antes do
                corte.
              </p>
            </>
          ),
        },
      ]}
      usosTitle="Situações comuns"
      usos={[
        { title: "Árvore dentro do terreno", text: "Quer tirar a árvore do quintal ou do lote." },
        { title: "Árvore na calçada", text: "Árvore em frente à casa ou ao comércio." },
        { title: "Obra", text: "Árvore no lugar onde vai ser construído." },
        { title: "Risco de queda", text: "Árvore inclinada, oca ou doente." },
      ]}
      fotos={[]}
      duvidasTitle="Dúvidas sobre autorização para corte"
      duvidas={duvidas}
    />
  ),
});
