import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "MaxVPN - Быстрый и защищённый VPN до 10 Гбит/с",
    template: "%s | MaxVPN"
  },
  description: "⚡ Быстрый и защищённый VPN до 10 Гбит/с. 🔒 Технология VLESS — максимум анонимности и обход блокировок. 📱 iOS / Android / Windows / macOS. Подключение за минуту через Telegram.",
  keywords: [
    "VPN",
    "максимальная скорость",
    "анонимность",
    "обход блокировок",
    "VLESS",
    "iOS",
    "Android",
    "Windows",
    "macOS",
    "Telegram бот",
    "быстрое подключение"
  ],
  authors: [{ name: "MaxVPN Team" }],
  creator: "MaxVPN",
  publisher: "MaxVPN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://maxvpn.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://maxvpn.live",
    title: "MaxVPN - Быстрый и защищённый VPN до 10 Гбит/с",
    description: "⚡ Быстрый и защищённый VPN до 10 Гбит/с. 🔒 Технология VLESS — максимум анонимности и обход блокировок.",
    siteName: "MaxVPN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MaxVPN - Быстрый и защищённый VPN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxVPN - Быстрый и защищённый VPN до 10 Гбит/с",
    description: "⚡ Быстрый и защищённый VPN до 10 Гбит/с. 🔒 Технология VLESS — максимум анонимности и обход блокировок.",
    images: ["/og-image.jpg"],
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
