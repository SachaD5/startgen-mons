type Option = { value: string; label: string };

type Props = {
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
};

const fieldClass =
    "w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition text-sm";

export default function FormField({
                                      label, name, value, onChange, as = "input", type = "text",
                                      placeholder, required, options = [], rows = 5,
                                  }: Props) {
    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">
                {label}
            </label>

            {as === "select" ? (
                <select id={name} name={name} value={value} required={required}
                        onChange={(e) => onChange(e.target.value)} className={fieldClass}>
                    <option value="">Choisir…</option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            ) : as === "textarea" ? (
                <textarea id={name} name={name} value={value} rows={rows} required={required}
                          placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
                          className={fieldClass} />
            ) : (
                <input id={name} name={name} type={type} value={value} required={required}
                       placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
                       className={fieldClass} />
            )}
        </div>
    );
}
