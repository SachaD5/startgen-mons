type Option = { value: string; label: string };

export type FormFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    as?: "input" | "select" | "textarea";
    type?: string;
    placeholder?: string;
    required?: boolean;
    options?: Option[];
    rows?: number;
    /** Message d'erreur affiché sous le champ (le champ devient rouge) */
    error?: string;
    /** Petit texte d'aide sous le champ */
    hint?: string;
    /** Icône à gauche du champ */
    icon?: React.ReactNode;
    /** Élément à droite du champ (ex : bouton "afficher le mot de passe") */
    rightSlot?: React.ReactNode;
    autoComplete?: string;
    maxLength?: number;
    disabled?: boolean;
    /** textarea : affiche "12/2000" */
    counter?: boolean;
};

const base =
    "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 disabled:opacity-60";
const normal = "border-white/10 focus:border-brand focus:ring-brand/20";
const invalid = "border-red-500/60 focus:border-red-500 focus:ring-red-500/20";

export default function FormField({
    label, name, value, onChange, as = "input", type = "text", placeholder, required,
    options = [], rows = 5, error, hint, icon, rightSlot, autoComplete, maxLength, disabled, counter,
}: FormFieldProps) {
    const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
    const classes = [
        base,
        error ? invalid : normal,
        icon ? "pl-11" : "",
        rightSlot ? "pr-12" : "",
        as === "textarea" ? "resize-none" : "",
    ].join(" ");

    const shared = {
        id: name,
        name,
        value,
        required,
        disabled,
        className: classes,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
    } as const;

    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        {icon}
                    </span>
                )}

                {as === "select" ? (
                    <select {...shared} onChange={(e) => onChange(e.target.value)}>
                        <option value="">Choisir…</option>
                        {options.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                ) : as === "textarea" ? (
                    <textarea
                        {...shared}
                        rows={rows}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onChange={(e) => onChange(e.target.value)}
                    />
                ) : (
                    <input
                        {...shared}
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        maxLength={maxLength}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}

                {rightSlot && <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>}
            </div>

            <div className="mt-1.5 flex justify-between gap-3 text-xs">
                <div>
                    {error ? (
                        <p id={`${name}-error`} className="text-red-400">{error}</p>
                    ) : hint ? (
                        <p id={`${name}-hint`} className="text-gray-500">{hint}</p>
                    ) : null}
                </div>
                {counter && maxLength && (
                    <span className="shrink-0 text-gray-500">{value.length}/{maxLength}</span>
                )}
            </div>
        </div>
    );
}
