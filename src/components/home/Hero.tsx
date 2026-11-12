import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function Hero() {
    return (
        <section
            className="relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative mx-auto max-w-4xl px-4 py-28 text-center">
                <Badge>Les Jeunes Entreprises</Badge>
                <h1 className="mt-6 text-4xl font-bold md:text-6xl">
                    Entreprends, <span className="text-brand">ensemble</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-gray-300">
                    Sois acteur du changement, développe tes compétences, crée ton réseau et booste ton parcours avec StartGen Mons.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button href="/register">Rejoindre StartGen Mons</Button>
                    <Button href="/contact" variant="outline">Nous contacter</Button>
                </div>
            </div>
        </section>
    );
}
