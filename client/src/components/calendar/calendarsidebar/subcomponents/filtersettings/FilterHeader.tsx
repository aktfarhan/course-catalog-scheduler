import { ChevronDown, Settings2 } from 'lucide-react';
import clsx from 'clsx';

export default function FilterHeader({ isOpen, onToggle, selectedTerm }: any) {
    return (
        <button
            onClick={onToggle}
            className="w-full p-5 flex items-center justify-between hover:bg-gray-100/50 transition-colors"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-theme-blue rounded-xl text-white shadow-lg shadow-blue-100">
                    <Settings2 size={18} />
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="text-[13px] font-bold text-gray-900 tracking-tight">
                        Schedule Options
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                        {selectedTerm}
                    </span>
                </div>
            </div>
            <ChevronDown
                size={18}
                className={clsx(
                    'text-gray-400 transition-transform duration-300',
                    isOpen && 'rotate-180',
                )}
            />
        </button>
    );
}
