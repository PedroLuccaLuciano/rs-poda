import { COMPANY } from "@/lib/company";

/** Vazio = os botões de e-mail ficam ocultos em todo o site. */
export const EMAIL: string = COMPANY.email;

export function emailUrl(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const EMAIL_SUBJECT = "Solicitação de orçamento - RS Poda";

export const EMAIL_BODY = [
  "Olá! Gostaria de solicitar um orçamento.",
  "",
  "Empresa/Nome:",
  "Serviço:",
  "Local (cidade e bairro):",
  "Prazo desejado:",
  "",
  "Seguem fotos do local em anexo.",
].join("\n");

export const EMAIL_URL = EMAIL ? emailUrl(EMAIL_SUBJECT, EMAIL_BODY) : "";
