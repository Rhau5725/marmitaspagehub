import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Lora({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "+200 Receitas de Marmitas Fit Congeláveis",
  description: "Receitas, planejamento semanal, lista de compras e ferramentas para organizar suas marmitas fit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${sans.variable} ${display.variable}`}>{children}</body></html>;
}
