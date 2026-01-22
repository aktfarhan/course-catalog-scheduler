import clsx from 'clsx';

function NavigationTabs({ activeTab, setActiveTab, totalResults }: any) {
    return (
        <nav className="w-full px-10 pt-6 pb-0 shrink-0 bg-gray-50 border-b border-gray-100">
            <div className="flex items-end gap-1 h-12">
                <button
                    onClick={() => setActiveTab('catalog')}
                    className={clsx(
                        'px-10 h-full flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-t-2xl border-t-2 border-x-2',
                        activeTab === 'catalog'
                            ? 'bg-white border-gray-200 text-gray-900 translate-y-px z-10'
                            : 'bg-transparent border-transparent text-gray-400',
                    )}
                >
                    Catalog
                    <span
                        className={clsx(
                            'px-2 py-0.5 rounded-md text-[9px] font-black',
                            activeTab === 'catalog'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-400',
                        )}
                    >
                        {totalResults?.toLocaleString()}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={clsx(
                        'px-10 h-full flex items-center justify-center text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-t-2xl border-t-2 border-x-2',
                        activeTab === 'calendar'
                            ? 'bg-white border-gray-200 text-gray-900 translate-y-px z-10'
                            : 'bg-transparent border-transparent text-gray-400',
                    )}
                >
                    Calendar
                </button>
            </div>
        </nav>
    );
}

export default NavigationTabs;
