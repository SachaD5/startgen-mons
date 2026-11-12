import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Navbar() {
    return (
        <header className="border-b border-white/10">
            <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-4">
                <Link href="/" className="justify-self-start text-lg font-bold">
                    Start<span className="text-brand">Gen</span> <span className="text-brand">Mons</span>
                </Link>

                <div className="hidden items-center gap-8 text-sm md:flex">
                    <Link href="/" className="text-gray-300 transition hover:text-brand">Accueil</Link>
                    <Link href="/#reseau" className="text-gray-300 transition hover:text-brand">Réseau</Link>
                    <Link href="/contact" className="text-gray-300 transition hover:text-brand">Contact</Link>
                </div>

                <div className="justify-self-end">
                    <Button href="/login">Connexion</Button>
                </div>
            </nav>
        </header>
    );
}
