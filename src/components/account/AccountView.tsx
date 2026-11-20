"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Ico, ICONES } from "@/components/ui/Ico";
import { useAuth } from "@/components/auth/AuthProvider";
import ProfileForm from "@/components/account/ProfileForm";
import PasswordForm from "@/components/account/PasswordForm";

// Page "Mon compte" : réservée aux personnes connectées
export default function AccountView() {
    const { status, user, logout } = useAuth();
    const router = useRouter();

    // Pas connecté : retour à la page de connexion
    useEffect(() => {
        if (status === "anonymous") router.replace("/login");
    }, [status, router]);

    // Le lien "Paramètres et sécurité" (/compte#securite) arrive avant que la page soit affichée :
    // une fois le compte chargé, on descend jusqu'à la section demandée
    const pret = status === "authenticated";
    useEffect(() => {
        if (!pret || !window.location.hash) return;
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, [pret]);

    if (!user) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-16">
                <div className="h-10 w-64 animate-pulse rounded-xl bg-white/5" />
                <div className="mt-10 grid gap-8 lg:grid-cols-3">
                    <div className="h-80 animate-pulse rounded-3xl bg-white/5" />
                    <div className="h-[28rem] animate-pulse rounded-3xl bg-white/5 lg:col-span-2" />
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-up mx-auto max-w-6xl px-4 py-12 md:py-16">
            <header className="mb-10">
                <span className="mb-4 inline-block rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                    Mon compte
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Salut, <span className="text-brand">{user.prenom}</span>
                </h1>
                <p className="mt-2 max-w-xl text-gray-400">
                    Retrouve et modifie tes informations personnelles, et protège ton compte.
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Colonne de gauche : résumé du compte */}
                <aside>
                    <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-xl lg:sticky lg:top-28">
                        <div className="flex flex-col items-center text-center">
                            <Avatar prenom={user.prenom} nom={user.nom} size="lg" />
                            <h2 className="mt-4 text-xl font-bold text-white">
                                {user.prenom} {user.nom}
                            </h2>
                            <p className="mt-1 max-w-full truncate text-sm text-gray-400">{user.email}</p>
                            <span className="mt-3 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                                {user.role === "ADMIN" ? "Administrateur" : "Membre StartGen Mons"}
                            </span>
                        </div>

                        <nav className="space-y-1 border-t border-white/10 pt-4 text-sm">
                            <Link href="/agenda" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-300 transition hover:bg-white/5 hover:text-brand">
                                <Ico d={ICONES.cal} className="h-5 w-5" />
                                Voir l&apos;agenda
                            </Link>
                            <Link href="/contact" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-300 transition hover:bg-white/5 hover:text-brand">
                                <Ico d={ICONES.mail} className="h-5 w-5" />
                                Contacter l&apos;équipe
                            </Link>
                        </nav>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                logout();
                                router.push("/");
                            }}
                        >
                            Se déconnecter
                        </Button>
                    </div>
                </aside>

                {/* Colonne de droite : les deux formulaires */}
                <div className="space-y-8 lg:col-span-2">
                    <Carte titre="Informations personnelles" description="Ces informations sont utilisées sur ton compte StartGen Mons.">
                        <ProfileForm user={user} />
                    </Carte>

                    <Carte
                        id="securite"
                        titre="Mot de passe"
                        description="Choisis un mot de passe que tu n'utilises nulle part ailleurs."
                    >
                        <PasswordForm />
                    </Carte>
                </div>
            </div>
        </div>
    );
}

function Carte({
    id, titre, description, children,
}: { id?: string; titre: string; description: string; children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-28 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-xl md:p-8">
            <h2 className="text-xl font-bold text-white">{titre}</h2>
            <p className="mb-6 mt-1 text-sm text-gray-400">{description}</p>
            {children}
        </section>
    );
}
