import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { trackEmailClick, trackWhatsAppClick } from "@/lib/analytics";
import { EMAIL, EMAIL_SUBJECT, emailUrl } from "@/lib/email";

const SERVICOS = [
  "Poda de árvore",
  "Remoção de árvore",
  "Roçada de terreno",
  "Limpeza e retirada de resíduos",
];
const QUANDO = ["Hoje", "Amanhã", "Esta semana", "Sem urgência"];
const selectClass =
  "h-12 w-full rounded-md border border-input bg-background px-3 text-base font-normal";

export function QuoteForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg =
      "Olá! Vim pelo site da RS Poda e gostaria de um orçamento." +
      `\nServiço: ${String(d.get("servico"))}` +
      `\nLocal (cidade e bairro): ${String(d.get("local"))}` +
      `\nPara quando: ${String(d.get("quando"))}` +
      "\nVou enviar uma foto da árvore ou do terreno em seguida.";
    trackWhatsAppClick("formulario");
    const url = whatsappUrl(msg);
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    else window.location.href = url;
  }

  function onEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const d = new FormData(form);
    const body =
      "Olá! Gostaria de solicitar um orçamento." +
      `\n\nServiço: ${String(d.get("servico"))}` +
      `\nLocal (cidade e bairro): ${String(d.get("local"))}` +
      `\nPara quando: ${String(d.get("quando"))}` +
      "\n\nSeguem fotos do local em anexo.";
    trackEmailClick("formulario");
    window.location.href = emailUrl(EMAIL_SUBJECT, body);
  }

  return (
    <form
      id="orcamento"
      onSubmit={onSubmit}
      className="mx-auto max-w-xl scroll-mt-24 rounded-2xl bg-card p-6 text-left text-foreground shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">
          Serviço
          <select name="servico" className={selectClass} defaultValue={SERVICOS[0]}>
            {SERVICOS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Cidade e bairro
          <Input
            name="local"
            required
            autoComplete="off"
            placeholder="Ex.: Joinville, Costa e Silva"
            className="h-12 text-base font-normal"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Para quando?
          <select name="quando" className={selectClass} defaultValue={QUANDO[1]}>
            {QUANDO.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </label>
      </div>
      <Button type="submit" variant="whatsapp" size="xl" className="mt-5 w-full">
        <MessageCircle aria-hidden="true" className="size-5" />
        Enviar pelo WhatsApp
      </Button>
      {EMAIL && (
        <Button type="button" variant="outline" size="xl" className="mt-3 w-full" onClick={onEmail}>
          <Mail aria-hidden="true" className="size-5" />
          Enviar por e-mail
        </Button>
      )}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        O WhatsApp{EMAIL ? " ou o seu e-mail abrem" : " abre"} com os dados preenchidos. Depois, envie
        uma foto da árvore ou do terreno para agilizar o orçamento.
      </p>
    </form>
  );
}