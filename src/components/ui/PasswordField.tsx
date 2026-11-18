"use client";

import { useState } from "react";
import FormField, { type FormFieldProps } from "@/components/ui/FormField";
import { IconEye, IconEyeOff, IconLock } from "@/components/ui/icons";

type Props = Omit<FormFieldProps, "as" | "type" | "icon" | "rightSlot">;

// Champ mot de passe avec un bouton "œil" pour afficher / masquer ce qu'on tape
export default function PasswordField(props: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <FormField
            {...props}
            type={visible ? "text" : "password"}
            icon={<IconLock />}
            rightSlot={
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    className="rounded-lg p-2 text-gray-500 transition hover:text-brand"
                >
                    {visible ? <IconEyeOff /> : <IconEye />}
                </button>
            }
        />
    );
}
