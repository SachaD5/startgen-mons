import { IconAlert, IconCheck } from "@/components/ui/icons";

type Props = { variant?: "error" | "success"; children: React.ReactNode };

const styles = {
    error: "border-red-500/30 bg-red-500/10 text-red-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

// Message encadré (erreur du serveur, confirmation...)
export default function Alert({ variant = "error", children }: Props) {
    return (
        <div
            role={variant === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${styles[variant]}`}
        >
            {variant === "error" ? (
                <IconAlert className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <div>{children}</div>
        </div>
    );
}
