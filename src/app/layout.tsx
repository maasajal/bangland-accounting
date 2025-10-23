// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./globals.css";
import theme from "@/theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "Bangland - Accounting Services for Wolt & Foodora Riders in Finland",
    template: "%s | Bangland Accounting",
  },
  description:
    "Professional accounting services for Wolt & Foodora riders in Finland. Invoice processing, bookkeeping, VAT submission, tax calculations. Founded by experienced delivery riders.",
  keywords: [
    "Wolt accounting",
    "Foodora accounting",
    "delivery rider accounting Finland",
    "invoice services Finland",
    "VAT submission Finland",
    "bookkeeping services",
    "tax calculation Finland",
    "freelancer accounting",
    "entrepreneur accounting Finland",
  ].join(", "),
  authors: [{ name: "Bangland Accounting" }],
  creator: "Bangland Accounting",
  publisher: "Bangland Accounting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bac-form.quickaccount.fi"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bac-form.quickaccount.fi",
    title: "Bangland - Accounting Services for Wolt & Foodora Riders",
    description:
      "Professional accounting services for delivery riders in Finland. Invoice processing, VAT submission, and tax calculations.",
    siteName: "Bangland Accounting",
    images: [
      {
        url: "/og-image.jpg", // Create this image
        width: 1200,
        height: 630,
        alt: "Bangland Accounting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangland - Accounting Services for Riders",
    description: "Professional accounting for Wolt & Foodora riders in Finland",
    images: ["/twitter-image.jpg"], // Create this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code
    // google: 'your-verification-code',
    google:
      "google-site-verification=EfhWSyCRVZpSKBJe1w9TTCaglIGlPr7zx_pGmy5LF_Q",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AccountingService",
              name: "Bangland Accounting",
              description:
                "Accounting services for Wolt and Foodora delivery riders in Finland",
              url: "https://bac-form.quickaccount.fi",
              telephone: "+358449304321", // Add your phone number
              address: {
                "@type": "PostalAddress",
                addressLocality: "Helsinki",
                addressCountry: "FI",
              },
              serviceType: [
                "Bookkeeping",
                "Tax Preparation",
                "VAT Submission",
                "Invoicing Services",
              ],
              areaServed: "Finland",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Accounting Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Rider Accounting Package",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={inter.className}
        data-new-gr-c-s-check-loaded="8.934.0"
        data-gr-ext-installed=""
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
