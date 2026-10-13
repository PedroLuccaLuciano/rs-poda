/**
 * Camada de analytics preparada para GA4, Google Tag Manager e Meta Pixel.
 *
 * Basta preencher os IDs abaixo (ou as variáveis de ambiente VITE_*) para
 * ativar as integrações. Enquanto vazios, nada é carregado e nenhum erro ocorre.
 */

const env = import.meta.env as Record<string, string | undefined>;

export const GA4_ID = env["VITE_GA4_ID"] ?? "";
export const GTM_ID = env["VITE_GTM_ID"] ?? "";
export const META_PIXEL_ID = env["VITE_META_PIXEL_ID"] ?? "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  }

  if (GA4_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID);
  }

  if (META_PIXEL_ID) {
    /* eslint-disable */
    // Snippet oficial do Meta Pixel
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      b.head.appendChild(t);
    })(window as any, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq?.("init", META_PIXEL_ID);
    window.fbq?.("track", "PageView");
  }
}

/** Evento único de conversão para TODOS os cliques em botões de WhatsApp. */
export function trackWhatsAppClick(location: string) {
  const payload = { event: "whatsapp_click", location, channel: "whatsapp" };
  try {
    window.dataLayer?.push(payload);
    window.gtag?.("event", "whatsapp_click", {
      event_category: "conversao",
      event_label: location,
    });
    window.fbq?.("track", "Contact", { content_name: location, channel: "whatsapp" });
  } catch {
    /* analytics nunca deve quebrar a navegação */
  }
}

/** Evento de conversão para cliques em ligar (separado do WhatsApp). */
export function trackPhoneClick(location: string) {
  const payload = { event: "phone_click", location, channel: "phone" };
  try {
    window.dataLayer?.push(payload);
    window.gtag?.("event", "phone_click", {
      event_category: "conversao",
      event_label: location,
    });
    window.fbq?.("track", "Contact", { content_name: location, channel: "phone" });
  } catch {
    /* analytics nunca deve quebrar a navegação */
  }
}

/** Evento de conversão para cliques em e-mail. */
export function trackEmailClick(location: string) {
  const payload = { event: "email_click", location, channel: "email" };
  try {
    window.dataLayer?.push(payload);
    window.gtag?.("event", "email_click", {
      event_category: "conversao",
      event_label: location,
    });
    window.fbq?.("track", "Contact", { content_name: location, channel: "email" });
  } catch {
    /* analytics nunca deve quebrar a navegação */
  }
}