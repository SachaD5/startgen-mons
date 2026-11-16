import { SITE } from "@/data/site";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-surface py-6 text-center text-xs text-gray-500">
            <p>
                © {SITE.annee} {SITE.complet} — {SITE.organisation}. Tous droits réservés
            </p>
        </footer>
    );
}
