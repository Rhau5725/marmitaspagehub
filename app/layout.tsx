import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "+200 Receitas de Marmitas Fit Congeláveis",
  description: "Receitas, planejamento semanal, lista de compras e ferramentas para organizar suas marmitas fit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          async
          defer
        />
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`window.pixelId = "6a540b2f544622bc4f7bfeee";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(a);`}
        </Script>
      </body>
    </html>
  );
}
