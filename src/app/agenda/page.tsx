import { Suspense } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import AgendaView from "@/components/agenda/AgendaView";
import { getAgendaEvents } from "@/lib/openagenda";

export const metadata = { title: "Agenda" };

// Les événements sont chargés à part : le cadre et le titre s'affichent tout de suite, le calendrier arrive juste après.
async function Evenements() {
    const { events, error } = await getAgendaEvents();
    return <AgendaView events={events} error={error} />;
}

// Même principe que les pages Connexion et Contact : un seul grand cadre arrondi, avec une photo en haut.
export default function AgendaPage() {
    return (
        <section className="px-4 py-10 md:py-16">
            <div className="animate-fade-up mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                <header className="relative overflow-hidden px-6 py-10 sm:px-12 sm:py-14">
                    <Image src="/startgen-043.jpg" alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" style={{ objectPosition: "20% 42%" }} priority />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/85 to-brand/30" />
                    <div className="relative max-w-2xl [text-shadow:0_2px_12px_rgb(0_0_0/0.7)]">
                        <Badge>Agenda</Badge>
                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Les événements StartGen</h1>
                        <p className="mt-2 text-gray-300">Ateliers, workshops et rencontres du réseau : tout ce qui arrive, en un coup d&apos;œil.</p>
                    </div>
                </header>

                <div className="p-4 sm:p-8">
                    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/5" />}>
                        <Evenements />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
