import { useEffect, useState } from "react";
import logo from "@/assets/logo-rs.png.asset.json";
import { Mail, Phone } from "lucide-react";
import { PHONE_URL } from "@/lib/whatsapp";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";
import { EMAIL, EMAIL_URL } from "@/lib/email";
import { WhatsAppButton } from "./WhatsAppButton";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Galeria" },
  { href: "#clientes", label: "Clientes" },
  { href: "#area", label: "Onde atendemos" },
  { href: "#faq", label: "Dúvidas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-shadow ${
        scrolled ? "bg-background/95 shadow-card backdrop-blur" : "bg-background/85 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20">
        <a href="#topo" className="flex items-center gap-3" aria-label="RS Poda — início">
          <img
            src="/images/opt/icone3-h96.webp"
            alt="Logotipo RS Poda"
            width={48}
            height={48}
            className="h-10 w-auto sm:h-12"
          />
          <span className="hidden text-sm font-bold leading-tight text-primary sm:block">
            RS Poda
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={PHONE_URL}
            onClick={() => trackPhoneClick("header")}
            aria-label="Ligar para a RS Poda"
            className="grid size-11 place-items-center rounded-md border-2 border-primary/30 text-primary transition-colors hover:bg-secondary sm:size-12"
          >
            <Phone aria-hidden="true" className="size-5" />
          </a>
          {EMAIL && (
            <a
              href={EMAIL_URL}
              onClick={() => trackEmailClick("header")}
              aria-label="Pedir orçamento por e-mail"
              className="hidden size-12 place-items-center rounded-md border-2 border-primary/30 text-primary transition-colors hover:bg-secondary sm:grid"
            >
              <Mail aria-hidden="true" className="size-5" />
            </a>
          )}
          <WhatsAppButton location="header" size="lg">
            <span className="hidden sm:inline">Pedir orçamento</span>
            <span className="sm:hidden">Orçamento</span>
          </WhatsAppButton>
        </div>
      </div>
    </header>
  );
}