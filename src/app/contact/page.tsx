import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-xl px-4 py-16">
            <PageHeader badge="Contact" title="Écris-nous" subtitle="Une question ? Une idée ? On te répond vite." />
            <ContactForm />
        </div>
    );
}
