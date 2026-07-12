import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "+200 Receitas de Marmitas Fit Congeláveis",
  description: "Receitas, planejamento semanal, lista de compras e ferramentas para organizar suas marmitas fit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
