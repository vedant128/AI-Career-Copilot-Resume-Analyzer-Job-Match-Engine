export const GrayTitle = ({ children }) => (
    <span className="bg-gradient-to-br from-stone-100 via-stone-300 to-stone-400 bg-clip-text text-transparent">
        {children}
    </span>
);

export const GreenTitle = ({ children }) => (
    <span className="bg-gradient-to-br from-green-300 via-green-400 to-green-600 bg-clip-text text-transparent">
        {children}
    </span>
);

export const SectionLabel = ({ children }) => (
    <p className="inline-flex items-center gap-2 text-xs font-semibold text-green-400 tracking-[0.14em] mb-4">
        <span className="w-4 h-px bg-green-400" />
        {children}
    </p>
);

export const SectionHeading = ({ gray, green }) => (
    <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em]">
        <GrayTitle>{gray}</GrayTitle>
        <br />
        <GreenTitle>{green}</GreenTitle>
    </h2>
);

export default function PageHeader({ label, gray, green, description, right }) {
    return (
        <div className="border-b border-white/8 px-8 py-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                <div>
                    {label && <SectionLabel>{label}</SectionLabel>}
                    <h1 className="font-serif text-5xl tracking-tight mt-1">
                        {gray && <GrayTitle>{gray} </GrayTitle>}
                        {green && <GreenTitle>{green}</GreenTitle>}
                    </h1>
                    {description && (
                        <p className="text-sm text-stone-500 font-light mt-2">
                            {description}
                        </p>
                    )}
                </div>
                {right && <div className="shrink-0">{right}</div>}
            </div>
        </div>
    );
}