"use client";

import { useState } from "react";
import PasswordField from "@/components/ui/PasswordField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { useAuth } from "@/components/auth/AuthProvider";
import { formError } from "@/lib/api";

const VIDE = { currentPassword: "", newPassword: "", confirmPassword: "" };

// Formulaire "Mot de passe" : ancien mot de passe + nouveau (à taper deux fois)
export default function PasswordForm() {
    const { changePassword } = useAuth();

    const [form, setForm] = useState(VIDE);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = (key: keyof typeof form) => (value: string) => {
        setForm((f) => ({ ...f, [key]: value }));
        setFieldErrors(({ [key]: _effacee, ...reste }) => reste);
        setSaved(false);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSaved(false);

        // Vérification rapide côté navigateur : les deux nouveaux mots de passe doivent être identiques
        if (form.newPassword !== form.confirmPassword) {
            setFieldErrors({ confirmPassword: ["Les deux mots de passe ne sont pas identiques"] });
            return;
        }

        setFieldErrors({});
        setLoading(true);
        try {
            await changePassword(form.currentPassword, form.newPassword);
            setForm(VIDE);
            setSaved(true);
        } catch (err) {
            const { message, fieldErrors } = formError(err);
            setError(message);
            setFieldErrors(fieldErrors);
        } finally {
            setLoading(false);
        }
    }

    const incomplet = !form.currentPassword || !form.newPassword || !form.confirmPassword;

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && <Alert>{error}</Alert>}
            {saved && <Alert variant="success">Ton mot de passe a bien été modifié.</Alert>}

            <PasswordField
                label="Mot de passe actuel"
                name="currentPassword"
                autoComplete="current-password"
                value={form.currentPassword}
                onChange={set("currentPassword")}
                error={fieldErrors.currentPassword?.[0]}
                required
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <PasswordField
                    label="Nouveau mot de passe"
                    name="newPassword"
                    autoComplete="new-password"
                    value={form.newPassword}
                    onChange={set("newPassword")}
                    error={fieldErrors.newPassword?.[0]}
                    hint="8 caractères minimum, avec une lettre et un chiffre."
                    required
                />
                <PasswordField
                    label="Confirmer le nouveau mot de passe"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                    error={fieldErrors.confirmPassword?.[0]}
                    required
                />
            </div>

            <div className="pt-1">
                <Button type="submit" loading={loading} disabled={incomplet}>
                    {loading ? "Modification…" : "Changer le mot de passe"}
                </Button>
            </div>
        </form>
    );
}
