import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import AgendaView from "@/components/agenda/AgendaView";
import { getAgendaEvents } from "@/lib/openagenda";

export const metadata = { title: "Agenda" };

// Les événements sont chargés à part : le titre s'affiche tout de suite, la liste arrive juste après.
async function Evenements() {
    const { events, error } = await getAgendaEvents();
    return <AgendaView events={events} error={error} />;
}

export default function AgendaPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16">
            <PageHeader
                badge="Agenda"
                title="Les événements StartGen"
                subtitle="Ateliers, workshops et rencontres du réseau : tout ce qui arrive, en un coup d'œil."
            />
            <Suspense fallback={<div className="h-[32rem] animate-pulse rounded-3xl bg-white/5" />}>
                <Evenements />
            </Suspense>
        </div>
    );
}
