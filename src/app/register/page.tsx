import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = { title: "Inscription" };

export default function RegisterPage() {
    return (
        <AuthShell
            badge="Rejoindre le réseau"
            title="Crée ton compte"
            subtitle="Quelques secondes suffisent pour rejoindre StartGen Mons."
            panelTitle="Rejoins l'aventure entrepreneuriale."
            panelPoints={[
                "Crée ton compte en moins d'une minute",
                "Participe aux ateliers, workshops et rencontres",
                "Fais grandir ton projet avec le réseau",
            ]}
            image="/ABB01564.jpg"
            imagePosition="65% 50%"
            imageZoom={1.2}
        >
            <RegisterForm />
        </AuthShell>
    );
}
