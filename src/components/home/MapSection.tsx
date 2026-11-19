import MapLoader from "@/components/home/MapLoader";
import AntenneCard from "@/components/home/AntenneCard";
import { antennas } from "@/data/antennas";

export default function MapSection() {
    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <MapLoader />
                    </div>

                    <div className="space-y-3">
                        <h3 className="mb-4 text-lg font-semibold text-white">Les 4 clubs du réseau</h3>
                        {antennas.map((antenne) => (
                            <AntenneCard key={antenne.id} antenne={antenne} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
