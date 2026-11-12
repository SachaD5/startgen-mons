import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: { default: "StartGen Mons", template: "%s | StartGen Mons" },
    description: "StartGen Mons : l'antenne entrepreneuriale des Jeunes Entreprises (LJE) à Mons.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="fr">
      <body className="min-h-screen bg-surface text-white flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      </body>
      </html>
  );
}
