import type { Metadata, Viewport } from "next";
import { Fredoka, JetBrains_Mono, Nunito } from "next/font/google";
import { Backdrop } from "@/components/backdrop";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bi.axven.xyz"),
  title: {
    default: "bi.ax — one link, all of you",
    template: "%s · bi.ax",
  },
  description:
    "Music, videos and socials on one page. Grab your name at bi.ax.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "bi.ax",
    url: "https://bi.axven.xyz",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
