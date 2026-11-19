import PageBanner from "@/components/ui/PageBanner";
import MapSection from "@/components/home/MapSection";
import { Ico, ICONES } from "@/components/ui/Ico";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/data/content";

export const metadata = { title: "Localisation" };

export default function LocalisationPage() {
    return (
        <>
            <PageBanner
                badge="Localisation"
                title="Où nous trouver"
                subtitle="Startgen Mons est à Mons, et fait partie d'un réseau de quatre clubs en Belgique : Mons, Louvain, Liège et Namur."
                image="/startgen-195.jpg"
                position="50% 60%"
            />
            <MapSection />
            <section className="px-6 pb-24">
                <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl border border-white/10 bg-black/30 p-8 md:flex-row md:items-center md:justify-between md:p-10">
                    <div>
                        <h2 className="text-2xl font-bold">Une question pour venir nous voir ?</h2>
                        <p className="mt-3 flex items-center gap-2 text-gray-300">
                            <Ico d={ICONES.pin} className="h-4 w-4 text-brand" /> {CONTACT.ville}
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-gray-300">
                            <Ico d={ICONES.mail} className="h-4 w-4 text-brand" />
                            <a href={`mailto:${CONTACT.email}`} className="transition hover:text-brand">{CONTACT.email}</a>
                        </p>
                    </div>
                    <Button href="/contact">Nous écrire</Button>
                </div>
            </section>
        </>
    );
}
