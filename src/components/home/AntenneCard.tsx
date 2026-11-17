import type { Antenne } from "@/data/antennas";

// Une carte de la liste des antennas, à côté de la carte interactive
export default function AntenneCard({ antenne }: { antenne: Antenne }) {
    return (
        <div
            className={`rounded-xl border p-4 transition ${
                antenne.active
                    ? "border-brand bg-surface shadow-md shadow-brand/10"
                    : "border-white/10 bg-surface/50 opacity-70 hover:opacity-100"
            }`}
        >
            <div className="mb-1 flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{antenne.nom}</h4>
                {antenne.active && (
                    <span className="rounded bg-brand px-2 py-0.5 text-[10px] font-bold text-surface">Actif ici</span>
                )}
            </div>
            <p className="mb-2 text-xs text-gray-400">{antenne.lieu}</p>
            <span className="text-xs font-medium text-brand">{antenne.statut}</span>
        </div>
    );
}
