// Jauge de solidité du mot de passe (purement indicative : la vraie règle est vérifiée par l'API)
function score(password: string): number {
    const checks = [
        password.length >= 8,
        /[A-Za-z]/.test(password) && /[0-9]/.test(password),
        /[a-z]/.test(password) && /[A-Z]/.test(password),
        password.length >= 12 || /[^A-Za-z0-9]/.test(password),
    ];
    return checks.filter(Boolean).length;
}

const levels = [
    { label: "Très faible", bar: "bg-red-500", text: "text-red-400" },
    { label: "Faible", bar: "bg-red-500", text: "text-red-400" },
    { label: "Moyen", bar: "bg-amber-400", text: "text-amber-400" },
    { label: "Bien", bar: "bg-lime-400", text: "text-lime-400" },
    { label: "Excellent", bar: "bg-emerald-400", text: "text-emerald-400" },
];

export default function PasswordStrength({ password }: { password: string }) {
    if (!password) return null;
    const s = score(password);
    const level = levels[s];

    return (
        <div className="-mt-2" aria-live="polite">
            <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${i <= s ? level.bar : "bg-white/10"}`}
                    />
                ))}
            </div>
            <p className={`mt-1.5 text-xs ${level.text}`}>Solidité : {level.label}</p>
        </div>
    );
}
