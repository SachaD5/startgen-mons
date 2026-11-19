import Button from "@/components/ui/Button";

// Bandeau final : inviter à s'inscrire ou à écrire
export default function JoinBand() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-4xl rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-black/40 to-black/40 p-10 text-center md:p-16">
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Une idée ? Lance-toi avec nous.</h2>
                <p className="mx-auto mt-4 max-w-xl text-gray-300">
                    Crée ton compte pour rejoindre le réseau, ou écris-nous si tu as une question, un projet ou une envie de partenariat.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button href="/register">Rejoindre Startgen Mons</Button>
                    <Button href="/contact" variant="outline">Nous contacter</Button>
                </div>
            </div>
        </section>
    );
}
