// Petites icônes SVG (style "trait"), sans librairie. Elles prennent la couleur du texte (currentColor).
type IconProps = { className?: string };

function Svg({ className = "h-5 w-5", children }: IconProps & { children: React.ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export const IconMail = (p: IconProps) => (
    <Svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
);

export const IconLock = (p: IconProps) => (
    <Svg {...p}>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </Svg>
);

export const IconUser = (p: IconProps) => (
    <Svg {...p}>
        <circle cx="12" cy="8" r="3.8" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </Svg>
);

export const IconEye = (p: IconProps) => (
    <Svg {...p}>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.8" />
    </Svg>
);

export const IconEyeOff = (p: IconProps) => (
    <Svg {...p}>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.7A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3.2 3.9M6.4 6.9A16 16 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.7-.3 3.8-.8" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </Svg>
);

export const IconCheck = (p: IconProps) => (
    <Svg {...p}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
);

export const IconAlert = (p: IconProps) => (
    <Svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.5v.01" />
    </Svg>
);

export const IconSend = (p: IconProps) => (
    <Svg {...p}>
        <path d="M21 3 10.5 13.5" />
        <path d="M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" />
    </Svg>
);

export const IconUsers = (p: IconProps) => (
    <Svg {...p}>
        <circle cx="9" cy="8.5" r="3.3" />
        <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
        <path d="M16 5.5a3.2 3.2 0 0 1 0 6M18 14.2a6 6 0 0 1 3.2 5.3" />
    </Svg>
);

export const IconHandshake = (p: IconProps) => (
    <Svg {...p}>
        <path d="m3 11 4-4 4 1.5L14 7l4 4" />
        <path d="m3 11 5.5 5.5a2 2 0 0 0 2.8 0l.7-.7M21 11l-5.8 5.8a2 2 0 0 1-2.8 0l-1.4-1.4" />
        <path d="M2 10.5 3 11M22 10.5 21 11" />
    </Svg>
);

export const IconCalendar = (p: IconProps) => (
    <Svg {...p}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
);

export function IconSpinner({ className = "h-5 w-5" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
