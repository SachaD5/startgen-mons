import PageHeader from "@/components/ui/PageHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <PageHeader
                badge="Contact"
                title="Parlons de ton projet"
                subtitle="Une question, une idée, une envie de nous rejoindre ? Écris-nous."
            />

            <div className="animate-fade-up grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <ContactInfo />
                </div>
                <div className="lg:col-span-3">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
