"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";
import PasswordField from "@/components/ui/PasswordField";
import PasswordStrength from "@/components/ui/PasswordStrength";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { IconMail, IconUser } from "@/components/ui/icons";
import { useAuth } from "@/components/auth/AuthProvider";
import { formError } from "@/lib/api";

const empty = { prenom: "", nom: "", email: "", password: "", confirm: "" };

export default function RegisterForm() {
    const { register, status } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState(empty);
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    // Met à jour un champ ET efface son message d'erreur (le temps de retaper)
    const set = (key: keyof typeof form) => (value: string) => {
        setForm((f) => ({ ...f, [key]: value }));
        setFieldErrors(({ [key]: _effacee, ...reste }) => reste);
    };

    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        // Vérifications faites tout de suite dans le navigateur (l'API refait les siennes de toute façon)
        const local: Record<string, string[]> = {};
        if (form.password !== form.confirm) local.confirm = ["Les deux mots de passe ne correspondent pas"];
        if (!accepted) local.accepted = ["Tu dois accepter les conditions pour continuer"];
        setFieldErrors(local);
        if (Object.keys(local).length > 0) return;

        setLoading(true);
        try {
            await register({ prenom: form.prenom, nom: form.nom, email: form.email, password: form.password });
        } catch (err) {
            const { message, fieldErrors } = formError(err);
            setError(message);
            setFieldErrors(fieldErrors);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && <Alert>{error}</Alert>}

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                    label="Prénom"
                    name="prenom"
                    icon={<IconUser />}
                    placeholder="Jean"
                    autoComplete="given-name"
                    value={form.prenom}
                    onChange={set("prenom")}
                    error={fieldErrors.prenom?.[0]}
                    required
                />
                <FormField
                    label="Nom"
                    name="nom"
                    icon={<IconUser />}
                    placeholder="Dupont"
                    autoComplete="family-name"
                    value={form.nom}
                    onChange={set("nom")}
                    error={fieldErrors.nom?.[0]}
                    required
                />
            </div>

            <FormField
                label="Adresse e-mail"
                name="email"
                type="email"
                icon={<IconMail />}
                placeholder="prenom.nom@exemple.be"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                error={fieldErrors.email?.[0]}
                required
            />

            <PasswordField
                label="Mot de passe"
                name="password"
                placeholder="8 caractères minimum"
                autoComplete="new-password"
                hint="Au moins 8 caractères, avec une lettre et un chiffre."
                value={form.password}
                onChange={set("password")}
                error={fieldErrors.password?.[0]}
                required
            />
            <PasswordStrength password={form.password} />

            <PasswordField
                label="Confirmer le mot de passe"
                name="confirm"
                placeholder="Retape ton mot de passe"
                autoComplete="new-password"
                value={form.confirm}
                onChange={set("confirm")}
                error={fieldErrors.confirm?.[0]}
                required
            />

            <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-300">
                    <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                    />
                    J&apos;accepte que mes données soient utilisées pour gérer mon compte StartGen.
                </label>
                {fieldErrors.accepted && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.accepted[0]}</p>}
            </div>

            <Button type="submit" loading={loading} className="w-full">
                {loading ? "Création du compte…" : "Créer mon compte"}
            </Button>

            <p className="text-center text-sm text-gray-400">
                Déjà inscrit ?{" "}
                <Link href="/login" className="font-semibold text-brand hover:underline">
                    Se connecter
                </Link>
            </p>
        </form>
    );
}
