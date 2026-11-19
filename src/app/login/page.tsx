import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
    return (
        <AuthShell
            badge="Espace Membre"
            title="Content de te revoir"
            subtitle="Connecte-toi pour accéder à ton espace StartGen."
            panelTitle="Ton réseau d'entrepreneurs t'attend."
            panelPoints={[
                "Accède à ton espace membre",
                "Découvre les prochains événements de l'antenne de Mons",
                "Reste en lien avec le réseau StartGen",
            ]}
            image="/ABB01564.jpg"
            imagePosition="55% 50%"
            imageZoom={1.2}
        >
            <LoginForm />
        </AuthShell>
    );
}
