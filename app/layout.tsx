import type { Metadata } from "next";
import { Italiana, Jost } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solaya Estudio — Fotografía de bodas de autor",
  description:
    "Fotografía de autor para bodas excepcionales. Con base en Zacatecas, cobertura editorial e íntima en México y destino.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${italiana.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-ink">{children}</body>
    </html>
  );
}
