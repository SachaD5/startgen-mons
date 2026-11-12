"use client";

import { useState } from "react";
import FormCard from "@/components/ui/FormCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function ContactForm() {
    const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });

    const set = (key: keyof typeof form) => (value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO : envoi du message
        console.log(form);
    }

    return (
        <FormCard onSubmit={handleSubmit}>
            <FormField label="Nom" name="nom" value={form.nom} onChange={set("nom")} required />
            <FormField label="Adresse e-mail" name="email" type="email" value={form.email} onChange={set("email")} required />
            <FormField label="Sujet" name="sujet" value={form.sujet} onChange={set("sujet")} required />
            <FormField label="Message" name="message" as="textarea" value={form.message} onChange={set("message")} required />
            <Button type="submit" className="w-full">Envoyer</Button>
        </FormCard>
    );
}
