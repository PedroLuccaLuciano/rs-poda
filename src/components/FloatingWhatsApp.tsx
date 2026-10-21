import { PHONE_URL, WHATSAPP_URL } from "@/lib/whatsapp";
import { EMAIL, EMAIL_URL } from "@/lib/email";
import { trackEmailClick, trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";
import { Mail, MessageCircle, Phone } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <>
      {/* Mobile: barra fixa com WhatsApp + Ligar */}
      <div className={`fixed inset-x-0 bottom-0 z-50 grid ${EMAIL ? "grid-cols-3" : "grid-cols-2"} gap-2 border-t border-border bg-background/95 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-float backdrop-blur sm:hidden`}>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("barra_mobile")}
          aria-label="Falar agora no WhatsApp com a RS Poda"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp text-base font-semibold text-whatsapp-foreground"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          WhatsApp
        </a>
        <a
          href={PHONE_URL}
          onClick={() => trackPhoneClick("barra_mobile")}
          aria-label="Ligar para a RS Poda"
          className="flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-primary text-base font-semibold text-primary"
        >
          <Phone aria-hidden="true" className="size-5" />
          Ligar
        </a>
        {EMAIL && (
          <a
            href={EMAIL_URL}
            onClick={() => trackEmailClick("barra_mobile")}
            aria-label="Pedir orçamento por e-mail"
            className="flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-primary text-base font-semibold text-primary"
          >
            <Mail aria-hidden="true" className="size-5" />
            E-mail
          </a>
        )}
      </div>

      {/* Desktop: botão flutuante */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("botao_flutuante")}
        aria-label="Falar no WhatsApp com a RS Poda"
        className="fixed bottom-5 right-5 z-50 hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-4 text-whatsapp-foreground shadow-float transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-whatsapp/40 sm:flex"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40" />
        <MessageCircle aria-hidden="true" className="size-6" />
        <span className="text-sm font-semibold">Falar no WhatsApp</span>
      </a>
    </>
  );
}