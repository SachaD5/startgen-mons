export default function FormCard({
                                     children, onSubmit,
                                 }: { children: React.ReactNode; onSubmit: (e: React.FormEvent) => void }) {
    return (
        <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-black p-8">
            {children}
        </form>
    );
}
