import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-400">
            <p>© 2026 StartGen Mons</p>
            <Link href="/contact" className="mt-2 inline-block transition hover:text-brand">
                Nous contacter
            </Link>
        </footer>
    );
}
