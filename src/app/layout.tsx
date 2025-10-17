import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  preload: true,
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#0f172a;--foreground:#f8fafc}
            *{box-sizing:border-box;padding:0;margin:0}
            html{scroll-behavior:smooth}
            body{background:var(--background);color:var(--foreground);font-family:'Inter',system-ui,sans-serif;line-height:1.7;overflow-x:hidden;font-feature-settings:'kern' 1,'liga' 1,'calt' 1;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            .min-h-screen{min-height:100vh}
            .bg-gradient-to-br{background:linear-gradient(to bottom right,#0f172a,#1e293b,#0f172a)}
            .relative{position:relative}
            .z-10{z-index:10}
            .fixed{position:fixed}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .text-white{color:#ffffff}
            .text-center{text-align:center}
            .px-4{padding-left:1rem;padding-right:1rem}
            .py-8{padding-top:2rem;padding-bottom:2rem}
            button{cursor:pointer;border:none;background:transparent}
            @media (max-width:768px){.px-4{padding-left:1rem;padding-right:1rem}.py-8{padding-top:1.5rem;padding-bottom:1.5rem}}
          `
        }} />
      </head>
      <body className={`${inter.variable} ${unbounded.variable} font-sans antialiased bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
