"use client";

import { useState } from "react";
import FormCard from "@/components/ui/FormCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { antennes } from "@/data/antennes";

export default function RegisterForm() {
    const [form, setForm] = useState({
        prenom: "", nom: "", email: "", password: "", antenne: "",
    });

    const set = (key: keyof typeof form) => (value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO : appel à l'API d'inscription
        console.log(form);
    }

    return (
        <FormCard onSubmit={handleSubmit}>
            <FormField label="Prénom" name="prenom" value={form.prenom} onChange={set("prenom")} required />
            <FormField label="Nom" name="nom" value={form.nom} onChange={set("nom")} required />
            <FormField label="Adresse e-mail" name="email" type="email" value={form.email} onChange={set("email")} required />
            <FormField label="Mot de passe" name="password" type="password" value={form.password} onChange={set("password")} required />
            <FormField
                label="Antenne" name="antenne" as="select" value={form.antenne} onChange={set("antenne")}
                options={antennes.map((a) => ({ value: a.id, label: a.nom }))} required
            />
            <Button type="submit" className="w-full">Rejoindre le réseau</Button>
        </FormCard>
    );
}
