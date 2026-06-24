import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { siteConfig } from "@/lib/site-config";
import {
  buildDefaultSiteTitle,
  buildRootOpenGraph,
  buildRootTwitter,
} from "@/lib/metadata-social";
import {
  absoluteUrl,
  getGoogleSearchConsoleVerification,
  getSiteUrl,
} from "@/lib/site-url";
import { botIdProtectedRoutes } from "@/lib/botid-routes";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import { BotIdClient } from "botid/client";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);
  const siteUrl = getSiteUrl();
  const verification = getGoogleSearchConsoleVerification();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: buildDefaultSiteTitle(config),
      template: `%s | ${siteConfig.name}`,
    },
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: "/",
    },
    openGraph: buildRootOpenGraph(config, siteUrl),
    twitter: buildRootTwitter(config),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...(verification ? { verification } : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="preconnect" href="https://em.realscout.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.realscout.com" />
        <link rel="dns-prefetch" href="https://d1buiexcd5gara.cloudfront.net" />
        <BotIdClient protect={[...botIdProtectedRoutes]} />
        <link rel="me" href={absoluteUrl("/")} />
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="afterInteractive"
        />
        <Script id="widget-tracker" strategy="lazyOnload">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        <SiteJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
