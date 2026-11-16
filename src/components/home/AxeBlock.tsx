import Image from "next/image";
import type { Axe } from "@/data/axes";

type Props = Axe & {
    numero: number;
    /** true = image à droite, texte à gauche */
    inverse?: boolean;
};

// Un bloc "Axe 0X" : image d'un côté, texte de l'autre
export default function AxeBlock({ numero, titre, texte, image, alt, inverse = false }: Props) {
    return (
        <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-black/30 p-6 md:grid-cols-2 md:p-8">
            <div
                className={`relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:h-80 ${
                    inverse ? "md:order-2" : ""
                }`}
            >
                <Image src={image} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>

            <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-brand">
                    Axe {String(numero).padStart(2, "0")}
                </span>
                <h4 className="text-2xl font-bold text-white">{titre}</h4>
                <p className="text-sm leading-relaxed text-gray-400">{texte}</p>
            </div>
        </div>
    );
}
