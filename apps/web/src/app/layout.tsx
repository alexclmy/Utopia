import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Utopia · The world's best city, built by everyone",
  description:
    "Collect proven city ideas from real places, vote on them, and watch the adopted decisions reshape a living 3D city.",
  openGraph: {
    title: "Utopia",
    description: "The world's best city, built by everyone.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable}`}>{children}</body>
    </html>
  );
}
