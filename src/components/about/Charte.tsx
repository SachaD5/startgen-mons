import { Ico, ICONES } from "@/components/ui/Ico";

// La charte d'engagement des membres
export default function Charte() {
    return (
        <section className="px-6 pb-24">
            <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-white/10 bg-black/30 p-8 sm:flex-row sm:items-start md:p-10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Ico d={ICONES.star} className="h-6 w-6" />
                </span>
                <div>
                    <h2 className="text-2xl font-bold">La charte d&apos;engagement</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
                        Cette charte a été élaborée par la direction de LJE et de Startgen Mons. Elle s&apos;applique dans tous les clubs Startgen. En la signant, les
                        membres témoignent de leur intérêt pour Startgen Mons, confirment leur engagement et acceptent les responsabilités qui leur sont confiées :
                        ils deviennent alors officiellement membres de Startgen Belgium.
                    </p>
                </div>
            </div>
        </section>
    );
}
