import PageHeader from "@/components/ui/PageHeader";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
    return (
        <div className="mx-auto max-w-md px-4 py-16">
            <PageHeader badge="Espace Membre" title="Connexion" subtitle="Accède à ton espace membre." />
            <LoginForm />
        </div>
    );
}
