import PageBanner from "@/components/ui/PageBanner";
import ReseauSection from "@/components/reseau/ReseauSection";
import { antennas } from "@/data/antennas";
import JoinBand from "@/components/home/JoinBand";

export const metadata = { title: "Localisation" };

export default function LocalisationPage() {
    return (
        <>
            <PageBanner
                badge="Localisation"
                title="Où nous trouver"
                subtitle={`Startgen Mons est à Mons, et fait partie d'un réseau de ${antennas.length} clubs en Belgique : ${antennas.map((a) => a.ville).join(", ")}.`}
                image="/startgen-195.jpg"
                position="50% 60%"
            />
            <ReseauSection />
            <JoinBand />
        </>
    );
}
