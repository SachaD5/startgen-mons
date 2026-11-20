import type { Antenne } from "@/data/antennas";
import { lienItineraire } from "@/data/antennas";
import { Ico, ICONES } from "@/components/ui/Ico";

type Props = { antenne: Antenne; choisie: boolean; onChoisir: () => void };

// Une antenne dans la liste : un clic la montre sur la carte, et un clic sur la carte la met en avant ici
export default function AntenneCard({ antenne, choisie, onChoisir }: Props) {
    return (
        <div
            className={`overflow-hidden rounded-2xl border transition ${
                choisie ? "border-brand/60 bg-brand/10 shadow-lg shadow-brand/10" : "border-white/10 bg-black/30 hover:border-white/25"
            }`}
        >
            <button type="button" onClick={onChoisir} aria-pressed={choisie} className="flex w-full items-center gap-4 p-4 text-left">
                <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        antenne.active ? "bg-brand text-surface" : choisie ? "bg-brand/20 text-brand" : "bg-white/5 text-gray-400"
                    }`}
                >
                    <Ico d={ICONES.pin} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                        <span className="truncate font-semibold text-white">{antenne.ville}</span>
                        {antenne.active && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-surface">Actif ici</span>}
                    </span>
                    <span className="block truncate text-sm text-gray-400">{antenne.lieu}</span>
                </span>
            </button>

            {choisie && (
                <div className="border-t border-white/10 px-4 pb-4 pt-3">
                    <p className="text-sm font-medium text-brand">{antenne.statut}</p>
                    <p className="mt-1 text-sm text-gray-300">{antenne.description}</p>
                    <a
                        href={lienItineraire(antenne)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand/50 px-3.5 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand/10"
                    >
                        Itinéraire sur Google Maps
                    </a>
                </div>
            )}
        </div>
    );
}
