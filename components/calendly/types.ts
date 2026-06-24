interface CalendlyEmbedUtm {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string; utm?: CalendlyEmbedUtm }) => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        utm?: CalendlyEmbedUtm;
      }) => void;
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding?: boolean;
        utm?: CalendlyEmbedUtm;
      }) => void;
    };
  }
}

export {};
