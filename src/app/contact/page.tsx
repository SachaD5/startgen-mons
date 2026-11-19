import AuthShell from "@/components/auth/AuthShell";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
    return (
        <AuthShell
            badge="Contact"
            title="Parlons de ton projet"
            subtitle="Une question, une idée, une envie de nous rejoindre ? Écris-nous, on te répond par e-mail."
            panelTitle="Une idée ? Une question ? On t'écoute."
            panelPoints={[
                "Rejoindre l'antenne de Mons",
                "Partenariat ou sponsoring",
                "Une question sur un événement",
            ]}
            image="/startgen-195.jpg"
            imagePosition="62% 50%"
            imageZoom={1.2}
        >
            <ContactForm />
        </AuthShell>
    );
}
