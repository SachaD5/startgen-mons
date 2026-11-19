import PageBanner from "@/components/ui/PageBanner";
import Intro from "@/components/about/Intro";
import Association from "@/components/about/Association";
import Programme from "@/components/about/Programme";
import Team from "@/components/about/Team";
import Charte from "@/components/about/Charte";
import JoinBand from "@/components/home/JoinBand";

export const metadata = { title: "À propos" };

export default function AProposPage() {
    return (
        <>
            <PageBanner
                badge="À propos"
                title="Entreprendre quand on est étudiant, c'est possible"
                subtitle="Découvre qui nous sommes, ce que nous faisons et l'équipe qui fait vivre Startgen Mons."
                image="/startgen-157.jpg"
                position="50% 55%"
            />
            <Intro />
            <Association />
            <Programme />
            <Team />
            <Charte />
            <JoinBand />
        </>
    );
}
