import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../lib/i18n";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "برا السالفة | Out of the Loop",
  description: "لعبة الحفلات الأكثر متعة! متعددة اللاعبين | The best party game for groups!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang & dir are dynamically updated by LanguageProvider on the client.
    // We start with ar/rtl as the default (Arabic-first audience).
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Cairo – excellent Arabic support; Inter – clean Latin */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <LanguageSwitcher />
          <div id="root">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
