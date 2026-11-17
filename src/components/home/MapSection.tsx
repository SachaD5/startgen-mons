import Badge from "@/components/ui/Badge";
import MapLoader from "@/components/home/MapLoader";
import AntenneCard from "@/components/home/AntenneCard";
import { antennas } from "@/data/antennas";

export default function MapSection() {
    return (
        <section id="reseau" className="scroll-mt-20 border-t border-white/10 bg-black/30 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <Badge>Réseau & Implantation</Badge>
                    <h2 className="mb-4 mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Carte et antennes StartGen en Belgique
                    </h2>
                    <p className="mx-auto max-w-xl text-gray-400">
                        Retrouvez l&apos;antenne de Mons ainsi que les autres pôles du réseau StartGen à travers le pays.
                    </p>
                </div>

                <div className="grid items-center gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <MapLoader />
                    </div>

                    <div className="space-y-3">
                        <h3 className="mb-4 text-lg font-semibold text-white">Antennes disponibles :</h3>
                        {antennas.map((antenne) => (
                            <AntenneCard key={antenne.id} antenne={antenne} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
