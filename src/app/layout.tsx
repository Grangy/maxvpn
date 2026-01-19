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
    default: "MaxGroot - Защита цифровой жизни с MaxGroot Secure Connection",
    template: "%s | MaxGroot"
  },
  description: "🔒 Защита цифровой жизни с MaxGroot Secure Connection. Надёжное шифрование для защиты приватности. Предотвратите перехват паролей, банковских реквизитов и другой конфиденциальной информации. Доступ к глобальному контенту Netflix, Amazon Prime Video, YouTube и других платформ.",
  keywords: [
    "MaxGroot Secure Connection",
    "защита приватности",
    "шифрование",
    "защита данных",
    "безопасность",
    "iOS",
    "Android",
    "Windows",
    "macOS",
    "Telegram бот",
    "защита паролей",
    "защита банковских данных"
  ],
  authors: [{ name: "MaxGroot Team" }],
  creator: "MaxGroot",
  publisher: "MaxGroot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://maxgroot.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://maxgroot.live",
    title: "MaxGroot - Защита цифровой жизни с MaxGroot Secure Connection",
    description: "🔒 Защита цифровой жизни с MaxGroot Secure Connection. Надёжное шифрование для защиты приватности и конфиденциальной информации.",
    siteName: "MaxGroot",
    images: [
      {
        url: "/logo-rounded.png",
        width: 1200,
        height: 630,
        alt: "MaxGroot - Защита цифровой жизни",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxGroot - Защита цифровой жизни с MaxGroot Secure Connection",
    description: "🔒 Защита цифровой жизни с MaxGroot Secure Connection. Надёжное шифрование для защиты приватности и конфиденциальной информации.",
    images: ["/logo-rounded.png"],
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
  other: {
    "format-detection": "telephone=no",
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
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MaxGroot",
              "description": "Защита цифровой жизни с MaxGroot Secure Connection",
              "url": "https://maxgroot.live",
              "logo": "https://maxgroot.live/logo-rounded.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "availableLanguage": "Russian"
              }
            })
          }}
        />
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
