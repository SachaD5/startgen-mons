"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui/FormField";
import PasswordField from "@/components/ui/PasswordField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { IconMail } from "@/components/ui/icons";
import { useAuth } from "@/components/auth/AuthProvider";
import { formError } from "@/lib/api";

export default function LoginForm() {
    const { login, status } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    // Met à jour un champ ET efface son message d'erreur (le temps de retaper)
    const set = (key: keyof typeof form) => (value: string) => {
        setForm((f) => ({ ...f, [key]: value }));
        setFieldErrors(({ [key]: _effacee, ...reste }) => reste);
    };

    // Dès qu'on est connecté (juste après le login, ou si on arrive déjà connecté) : retour à l'accueil
    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setLoading(true);
        try {
            await login(form.email, form.password);
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
                placeholder="Ton mot de passe"
                autoComplete="current-password"
                value={form.password}
                onChange={set("password")}
                error={fieldErrors.password?.[0]}
                required
            />

            <Button type="submit" loading={loading} className="w-full">
                {loading ? "Connexion…" : "Se connecter"}
            </Button>

            <p className="text-center text-sm text-gray-400">
                Pas encore de compte ?{" "}
                <Link href="/register" className="font-semibold text-brand hover:underline">
                    Rejoindre le réseau
                </Link>
            </p>
        </form>
    );
}
