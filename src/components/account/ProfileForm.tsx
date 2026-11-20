"use client";

import { useState } from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { IconMail, IconUser } from "@/components/ui/icons";
import { useAuth } from "@/components/auth/AuthProvider";
import { ApiError, formError, type User } from "@/lib/api";

// Formulaire "Informations personnelles" : prénom, nom, e-mail
export default function ProfileForm({ user }: { user: User }) {
    const { updateProfile } = useAuth();

    const [form, setForm] = useState({ prenom: user.prenom, nom: user.nom, email: user.email });
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    // Met à jour un champ ET efface son message d'erreur (le temps de retaper)
    const set = (key: keyof typeof form) => (value: string) => {
        setForm((f) => ({ ...f, [key]: value }));
        setFieldErrors(({ [key]: _effacee, ...reste }) => reste);
        setSaved(false);
    };

    // Le bouton "Enregistrer" ne s'active que s'il y a quelque chose à enregistrer
    const modifie =
        form.prenom.trim() !== user.prenom ||
        form.nom.trim() !== user.nom ||
        form.email.trim().toLowerCase() !== user.email;

    function annuler() {
        setForm({ prenom: user.prenom, nom: user.nom, email: user.email });
        setError(null);
        setFieldErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setSaved(false);
        setLoading(true);
        try {
            const maj = await updateProfile(form);
            setForm({ prenom: maj.prenom, nom: maj.nom, email: maj.email });
            setSaved(true);
        } catch (err) {
            if (err instanceof ApiError && err.status === 409) {
                // E-mail déjà pris : le message s'affiche sous le champ
                setFieldErrors({ email: [err.message] });
            } else {
                const { message, fieldErrors } = formError(err);
                setError(message);
                setFieldErrors(fieldErrors);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && <Alert>{error}</Alert>}
            {saved && <Alert variant="success">Tes informations ont bien été enregistrées.</Alert>}

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                    label="Prénom"
                    name="prenom"
                    icon={<IconUser />}
                    autoComplete="given-name"
                    value={form.prenom}
                    onChange={set("prenom")}
                    error={fieldErrors.prenom?.[0]}
                    maxLength={60}
                    required
                />
                <FormField
                    label="Nom"
                    name="nom"
                    icon={<IconUser />}
                    autoComplete="family-name"
                    value={form.nom}
                    onChange={set("nom")}
                    error={fieldErrors.nom?.[0]}
                    maxLength={60}
                    required
                />
            </div>

            <FormField
                label="Adresse e-mail"
                name="email"
                type="email"
                icon={<IconMail />}
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                error={fieldErrors.email?.[0]}
                hint="C'est avec cette adresse que tu te connectes."
                required
            />

            <div className="flex flex-wrap gap-3 pt-1">
                <Button type="submit" loading={loading} disabled={!modifie}>
                    {loading ? "Enregistrement…" : "Enregistrer"}
                </Button>
                {modifie && !loading && (
                    <Button variant="outline" onClick={annuler}>
                        Annuler
                    </Button>
                )}
            </div>
        </form>
    );
}
