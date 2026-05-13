export const BentoCard = ({ className = '', icon, title, desc, children }) => {
    return (
        <div
            className={`relative bg-[#0f0f11] border border-white/10 hover:border-green-400/20 rounded-2xl p-9 h-full transition duration-300 overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-transparent pointer-events-none" />

            <span className="w-11 h-11 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-xl mb-5">
                {icon}
            </span>

            <h3 className="font-serif text-xl tracking-tight mb-2">{title}</h3>

            <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>

            {children}
        </div>
    )
}