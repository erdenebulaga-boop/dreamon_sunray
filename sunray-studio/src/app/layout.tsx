import type { Metadata } from "next";
import { DM_Sans, Istok_Web } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const istokWeb = Istok_Web({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunray Studio | Professional Beauty Products",
  description:
    "Salon-grade skincare, haircare, makeup, and beauty devices curated by Sunray Studio professionals. Shop authentic beauty products in Mongolia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body
        className={`${dmSans.variable} ${istokWeb.variable} font-body antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
