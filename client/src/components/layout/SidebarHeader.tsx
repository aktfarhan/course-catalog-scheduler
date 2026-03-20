function SidebarHeader() {
    return (
        <div className="relative p-8 select-none">
            <div className="flex items-center gap-4">
                <div className="font-space flex h-11 w-16 items-center justify-center rounded-xl bg-linear-to-b from-[#006da8] to-[#004a75] text-lg font-black tracking-wide text-white shadow-md ring-1 shadow-blue-200/40 ring-white/10 ring-inset">
                    UMB
                </div>
                <div>
                    <h1 className="font-space text-xl leading-tight font-extrabold tracking-tight">
                        <span className="text-slate-800">Course</span>{' '}
                        <span className="text-theme-blue">Search</span>
                    </h1>
                    <p className="mt-0.5 text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                        UMass Boston
                    </p>
                </div>
            </div>
            <div className="via-theme-blue/20 absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />
        </div>
    );
}

export default SidebarHeader;
