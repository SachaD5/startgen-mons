"use client";

import { useEffect, useState } from "react";
import FormCard from "@/components/ui/FormCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { IconCheck, IconMail, IconSend, IconUser } from "@/components/ui/icons";
import { useAuth } from "@/components/auth/AuthProvider";
import { api, formError } from "@/lib/api";

const SUJETS = [
    { value: "rejoindre", label: "Rejoindre l'antenne de Mons" },
    { value: "partenariat", label: "Partenariat ou sponsoring" },
    { value: "evenement", label: "Question sur un événement" },
    { value: "autre", label: "Autre question" },
];

const MAX_MESSAGE = 2000;
const empty = { nom: "", email: "", sujet: "", message: "", website: "" };

export default function ContactForm() {
    const { user } = useAuth();

    const [form, setForm] = useState(empty);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    const [sentTo, setSentTo] = useState<string | null>(null);

    // Met à jour un champ ET efface son message d'erreur (le temps de retaper)
    const set = (key: keyof typeof form) => (value: string) => {
        setForm((f) => ({ ...f, [key]: value }));
        setFieldErrors(({ [key]: _effacee, ...reste }) => reste);
    };

    // Si le visiteur est connecté, on pré-remplit son nom et son e-mail
    useEffect(() => {
        if (!user) return;
        setForm((f) => ({
            ...f,
            nom: f.nom || `${user.prenom} ${user.nom}`,
            email: f.email || user.email,
        }));
    }, [user]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setLoading(true);
        try {
            await api("/contact", { body: form });
            setSentTo(form.email);
            setForm({ ...empty, nom: form.nom, email: form.email });
        } catch (err) {
            const { message, fieldErrors } = formError(err);
            setError(message);
            setFieldErrors(fieldErrors);
        } finally {
            setLoading(false);
        }
    }

    // Écran de confirmation
    if (sentTo) {
        return (
            <div className="animate-fade-up rounded-2xl border border-white/10 bg-black p-8 text-center sm:p-12">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <IconCheck className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">Message envoyé !</h2>
                <p className="mx-auto mb-8 mt-3 max-w-sm text-sm text-gray-400">
                    Merci pour ton message. L&apos;équipe de StartGen Mons te répondra à l&apos;adresse{" "}
                    <span className="font-medium text-white">{sentTo}</span>.
                </p>
                <Button variant="outline" onClick={() => setSentTo(null)}>
                    Envoyer un autre message
                </Button>
            </div>
        );
    }

    return (
        <FormCard onSubmit={handleSubmit}>
            {error && <Alert>{error}</Alert>}

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                    label="Nom complet"
                    name="nom"
                    icon={<IconUser />}
                    placeholder="Jean Dupont"
                    autoComplete="name"
                    value={form.nom}
                    onChange={set("nom")}
                    error={fieldErrors.nom?.[0]}
                    required
                />
                <FormField
                    label="Adresse e-mail"
                    name="email"
                    type="email"
                    icon={<IconMail />}
                    placeholder="jean@exemple.be"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    error={fieldErrors.email?.[0]}
                    required
                />
            </div>

            <FormField
                label="Sujet"
                name="sujet"
                as="select"
                options={SUJETS}
                value={form.sujet}
                onChange={set("sujet")}
                error={fieldErrors.sujet?.[0]}
                required
            />

            <FormField
                label="Message"
                name="message"
                as="textarea"
                rows={6}
                placeholder="Dis-nous tout : qui tu es, ce que tu cherches, ton idée…"
                maxLength={MAX_MESSAGE}
                counter
                value={form.message}
                onChange={set("message")}
                error={fieldErrors.message?.[0]}
                required
            />

            {/* Champ piège pour les robots : invisible et inaccessible pour un humain, l'API ignore le message s'il est rempli */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                    Ne pas remplir
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(e) => set("website")(e.target.value)}
                    />
                </label>
            </div>

            <Button type="submit" loading={loading} className="w-full">
                {!loading && <IconSend className="h-4 w-4" />}
                {loading ? "Envoi en cours…" : "Envoyer le message"}
            </Button>
        </FormCard>
    );
}
