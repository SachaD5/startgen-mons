import SectionTitle from "@/components/ui/SectionTitle";
import AxeBlock from "@/components/home/AxeBlock";
import { axes } from "@/data/axes";

// Ce que fait Startgen Mons concrètement : un bloc photo + texte par axe
export default function Programme() {
    return (
        <section className="border-y border-white/10 bg-black/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionTitle badge="Ce qu'on fait" title="Un programme concret pour les étudiants entrepreneurs" />
                <div className="space-y-12">
                    {axes.map((axe, i) => (
                        <AxeBlock key={axe.titre} numero={i + 1} inverse={i % 2 === 1} {...axe} />
                    ))}
                </div>
            </div>
        </section>
    );
}
