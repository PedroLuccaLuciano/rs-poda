import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/company";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | RS Poda" },
      {
        name: "description",
        content: "Como a RS Poda trata os dados de quem visita o site e pede orçamento.",
      },
    ],
    links: [{ rel: "canonical", href: "https://rspoda.com.br/privacidade" }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-28 text-foreground">
        <h1 className="text-3xl font-bold text-primary">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-muted-foreground">Atualizada em 6 de novembro de 2026.</p>

        <div className="mt-8 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-primary">Quem somos</h2>
            <p className="mt-2">
              {COMPANY.name}, CNPJ {COMPANY.cnpj}, empresa de poda e remoção de árvores e roçada em Joinville
              e região (SC). Este site serve para apresentar os serviços e receber pedidos de orçamento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary">Quais dados coletamos</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Pedido de orçamento:</strong> o que você escreve no formulário é enviado como
                mensagem para o nosso WhatsApp. O site não guarda essas informações.
              </li>
              <li>
                <strong>Contato:</strong> quando você nos chama no WhatsApp, liga ou manda e-mail, usamos
                seu nome, telefone e a descrição do serviço só para responder e fazer o orçamento.
              </li>
              <li>
                <strong>Medição de visitas:</strong> usamos o Google Analytics e o Google Ads para saber
                quantas pessoas visitam o site e quantas clicam para falar com a gente. Essas ferramentas
                usam cookies e não nos mostram quem você é.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary">O que não fazemos</h2>
            <p className="mt-2">
              Não vendemos nem repassamos seus dados. Não enviamos propaganda sem você pedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary">Ferramentas do Google</h2>
            <p className="mt-2">
              Usamos ferramentas próprias, ligadas à nossa conta Google, para acompanhar como o site aparece
              nas pesquisas (Google Search Console). Elas só leem dados do nosso próprio site e não acessam
              dados de visitantes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary">Seus direitos (LGPD)</h2>
            <p className="mt-2">
              Você pode pedir para ver, corrigir ou apagar seus dados a qualquer momento pelo WhatsApp{" "}
              {WHATSAPP_DISPLAY} ou pelo e-mail{" "}
              <a className="underline" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
              . Você também pode bloquear cookies nas configurações do seu navegador.
            </p>
          </section>

          <p>
            <Link to="/" className="font-semibold text-primary underline">
              Voltar para a página inicial
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
