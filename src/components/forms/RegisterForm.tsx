"use client";

import { useState } from "react";
import FormCard from "@/components/ui/FormCard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO : appel à POST /auth/login de l'API (ne jamais afficher le mot de passe dans la console)
        console.log("Tentative de connexion pour :", email);
    }

    return (
        <FormCard onSubmit={handleSubmit}>
            <FormField label="Adresse e-mail" name="email" type="email" value={email} onChange={setEmail} required />
            <FormField label="Mot de passe" name="password" type="password" value={password} onChange={setPassword} required />
            <Button type="submit" className="w-full">Se connecter</Button>
        </FormCard>
    );
}
