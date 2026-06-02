import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Para Minha Garota Mágica 🌸",
  description: "Um cantinho especial feito com todo amor do mundo para celebrar o quanto ela é incrível e mágica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased scroll-smooth"
      style={{ colorScheme: 'light' }}
    >
      <head>
        {/* Força o modo claro em todos os navegadores/sistemas */}
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
