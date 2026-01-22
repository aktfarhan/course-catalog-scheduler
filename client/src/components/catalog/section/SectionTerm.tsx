import { CalendarDays } from 'lucide-react';

function SectionTerm({ term }: { term: string }) {
    return (
        <div className="absolute top-5 right-5 lg:static lg:flex lg:items-center lg:justify-center">
            <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                <CalendarDays size={14} className="text-gray-400 shrink-0" />
                <span className="truncate text-xs lg:text-sm font-semibold lg:font-medium">
                    {term}
                </span>
            </div>
        </div>
    );
}

export default SectionTerm;
