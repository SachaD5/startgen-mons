import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
    title: { default: SITE.complet, template: `%s | ${SITE.complet}` },
    description: `${SITE.complet} : l'antenne montoise du réseau d'entrepreneuriat étudiant de l'asbl ${SITE.organisation} (LJE).`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className="min-h-screen bg-surface text-white flex flex-col">
        {/* AuthProvider : tout le site sait si quelqu'un est connecté */}
        <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </AuthProvider>
        </body>
        </html>
    );
}
