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