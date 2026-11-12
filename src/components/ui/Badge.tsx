export default function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1 text-sm font-medium text-brand">
      {children}
    </span>
    );
}
