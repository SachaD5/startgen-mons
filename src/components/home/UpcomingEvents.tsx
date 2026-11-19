import Link from "next/link";
import { connection } from "next/server";
import SectionTitle from "@/components/ui/SectionTitle";
import { Ico, ICONES } from "@/components/ui/Ico";
import { getAgendaEvents } from "@/lib/openagenda";

const TZ = "Europe/Brussels";
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, ...o }).format(new Date(iso));

// Les 3 prochains événements de l'agenda (OpenAgenda), sur l'accueil
export default async function UpcomingEvents() {
    await connection(); // on utilise l'heure actuelle : cette partie est calculée à chaque visite
    const { events } = await getAgendaEvents();
    const maintenant = Date.now();

    const prochains = events
        .flatMap((event) => event.dates.map((d) => ({ event, ...d })))
        .filter((o) => Date.parse(o.fin) >= maintenant)
        .sort((a, b) => Date.parse(a.debut) - Date.parse(b.debut))
        .slice(0, 3);

    return (
        <section className="border-y border-white/10 bg-black/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionTitle badge="Agenda" title="Nos prochains événements" subtitle="Conférences, workshops et rencontres : viens quand tu veux, tout est ouvert aux étudiants." />

                {prochains.length === 0 ? (
                    <p className="rounded-3xl border border-white/10 bg-black/30 p-10 text-center text-gray-400">
                        Aucun événement annoncé pour le moment. Reviens bientôt, ou contacte-nous pour être prévenu !
                    </p>
                ) : (
                    <ul className="grid gap-6 md:grid-cols-3">
                        {prochains.map((o) => {
                            const lieu = [o.event.lieu, o.event.ville].filter(Boolean).join(", ");
                            return (
                                <li key={`${o.event.uid}-${o.debut}`}>
                                    <Link href="/agenda" className="flex h-full gap-5 rounded-3xl border border-white/10 bg-surface p-6 transition hover:border-brand/50">
                                        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand text-black">
                                            <span className="text-2xl font-extrabold leading-none">{fmt(o.debut, { day: "numeric" })}</span>
                                            <span className="mt-1 text-xs font-bold uppercase">{fmt(o.debut, { month: "short" }).replace(".", "")}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold leading-snug">{o.event.titre}</h3>
                                            <p className="mt-1 text-sm text-gray-400">
                                                <span className="capitalize">{fmt(o.debut, { weekday: "long" })}</span>, {fmt(o.debut, { hour: "2-digit", minute: "2-digit" })}
                                                {lieu && ` · ${lieu}`}
                                            </p>
                                            {o.event.prix && <p className="mt-2 text-sm font-semibold text-brand">{o.event.prix}</p>}
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <p className="mt-10 text-center">
                    <Link href="/agenda" className="inline-flex items-center gap-2 font-semibold text-brand transition hover:text-brand-hover">
                        Voir tout l&apos;agenda <Ico d={ICONES.arrow} className="h-4 w-4" />
                    </Link>
                </p>
            </div>
        </section>
    );
}
