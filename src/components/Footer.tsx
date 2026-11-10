export default function Footer() {
    return (
        <footer className="bg-[#1E1E1E] border-t border-white/10 py-5 w-full">
            <div className="w-full px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
                <p>© 2026 StartGen Mons - Les Jeunes Entreprises. Tous droits réservés.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-[#00D9FF] transition">Mentions légales</a>
                    <a href="/contact" className="hover:text-[#00D9FF] transition">Contact</a>
                </div>
            </div>
        </footer>
    );
}
