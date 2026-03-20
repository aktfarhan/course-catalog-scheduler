interface SectionNumberProps {
    sectionNumber: string;
}

function SectionNumber({ sectionNumber }: SectionNumberProps) {
    return (
        <div className="flex items-center gap-2 lg:flex-col lg:justify-center">
            <span className="w-24 text-[10px] font-bold tracking-widest text-slate-400 uppercase lg:hidden">
                Section
            </span>
            <span className="group-hover/row:text-theme-blue font-bold text-slate-600 transition-colors duration-200">
                {sectionNumber}
            </span>
        </div>
    );
}

export default SectionNumber;
