import logo from "@/assets/logo-rs.png.asset.json";
import { WhatsAppButton } from "./WhatsAppButton";
import { EmailButton } from "./EmailButton";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";
import { EMAIL } from "@/lib/email";
import { COMPANY } from "@/lib/company";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const social: { icon: typeof Instagram; label: string; href: string }[] = [
    { icon: Instagram, label: "Instagram", href: String(COMPANY.instagram) },
    { icon: Facebook, label: "Facebook", href: String(COMPANY.facebook) },
  ].filter((s) => s.href !== "");

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <img
            src={"/images/icone3.png"}
            alt="Logotipo RS Poda"
            width={80}
            height={80}
            loading="lazy"
            className="h-16 w-auto rounded-md bg-background p-1.5"
          />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/80">
            Poda de árvores, remoção e roçada de terrenos em Joinville e região,
            com equipe treinada e EPIs completos.
          </p>
          <p className="mt-4 text-xs text-primary-foreground/70">
            {COMPANY.name}
            <br />
            CNPJ {COMPANY.cnpj}
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li>
              <a
                className="flex items-center gap-2 transition-colors hover:text-accent"
                href={`tel:+55${WHATSAPP_DISPLAY.replace(/\D/g, "")}`}
                onClick={() => trackPhoneClick("rodape")}
              >
                <Phone aria-hidden="true" className="size-4 text-accent" />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            {EMAIL && (
              <li>
                <a
                  className="flex items-center gap-2 break-all transition-colors hover:text-accent"
                  href={`mailto:${EMAIL}`}
                  onClick={() => trackEmailClick("rodape")}
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  {EMAIL}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              {COMPANY.hours} • Emergência: ligue
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              {COMPANY.areaShort}
            </li>
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <s.icon aria-hidden="true" className="size-4 text-accent" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold">Peça seu orçamento</h2>
          <p className="mt-4 text-sm text-primary-foreground/85">
            Resposta rápida pelo WhatsApp{EMAIL ? " ou por e-mail" : ""}, sem compromisso.
          </p>
          <WhatsAppButton location="rodape" size="lg" className="mt-4 w-full sm:w-auto">
            Pedir orçamento no WhatsApp
          </WhatsAppButton>
          <EmailButton location="rodape" size="lg" className="mt-3 w-full sm:w-auto">
            Pedir orçamento por e-mail
          </EmailButton>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}