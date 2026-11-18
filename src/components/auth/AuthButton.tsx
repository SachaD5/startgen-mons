"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";

// Bouton de la Navbar : "Connexion" si visiteur, prénom + "Déconnexion" si connecté
export default function AuthButton() {
    const { status, user, logout } = useAuth();
    const router = useRouter();

    // Pendant la vérification de la session : un emplacement vide de la même taille (évite que la Navbar "saute")
    if (status === "loading") {
        return <div aria-hidden className="h-11 w-32 animate-pulse rounded-xl bg-white/5" />;
    }

    if (!user) return <Button href="/login">Connexion</Button>;

    const initiales = `${user.prenom[0] ?? ""}${user.nom[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-sm font-bold text-brand"
            >
                {initiales}
            </div>
            <span className="hidden text-sm text-gray-300 sm:block">
                Bonjour, <span className="font-semibold text-white">{user.prenom}</span>
            </span>
            <button
                type="button"
                onClick={() => {
                    logout();
                    router.push("/");
                }}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-brand hover:text-brand"
            >
                Déconnexion
            </button>
        </div>
    );
}
