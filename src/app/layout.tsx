import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LegacyShield Pro — Protect Your Family. Build Your Legacy.',
  description:
    'Financial literacy and estate education for DC working families. Learn life insurance, estate planning, and generational wealth strategies.',
  keywords: ['life insurance', 'estate planning', 'generational wealth', 'DC families', 'financial literacy'],
  openGraph: {
    title: 'LegacyShield Pro — Protect Your Family. Build Your Legacy.',
    description: 'Protect Your Family. Build Your Legacy.',
    url: 'https://legacyshieldpro.com',
    siteName: 'LegacyShield Pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://legacyshieldpro.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LegacyShield Pro — Protect Your Family. Build Your Legacy.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LegacyShield Pro — Protect Your Family. Build Your Legacy.',
    description: 'Financial literacy and estate education for DC working families.',
    images: ['https://legacyshieldpro.com/images/og-image.png'],
  },
  other: {
    'impact-site-verification': 'f71c8c44-9cd2-4737-8644-592d0745fb4c',
    'fo-verify': 'c509360c-c941-41f1-924d-b7988d8b195b',
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-9GVLZ7FS2K';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 — only loads when NEXT_PUBLIC_GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        {/* Rewardful Affiliate Tracking */}
        <Script id="rewardful-queue" strategy="afterInteractive">
          {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
        </Script>
        <Script src="https://r.wdfl.co/rw.js" data-rewardful="a7b451" strategy="afterInteractive" />
      </body>
    </html>
  );
}
