import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
        className="antialiased"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
