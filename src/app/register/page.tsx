import PageHeader from "@/components/ui/PageHeader";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = { title: "Inscription" };

export default function RegisterPage() {
    return (
        <div className="mx-auto max-w-md px-4 py-16">
            <PageHeader badge="Espace Membre" title="Rejoindre le réseau" subtitle="Crée ton compte StartGen." />
            <RegisterForm />
        </div>
    );
}
