// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./globals.css";
import theme from "@/theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bangland - Accounting Services",
  description:
    "Best Accounting services for Wolt & Foodora riders. Invoice, Bookkeeping, VAT submission & TAX calculations, Invoicing to Delivery company Wolt & Foodora. Join Bangland for professional business setup and accounting services in Finland",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
