import { CalendarDays } from 'lucide-react';

interface SectionTermProps {
    term: string;
}

function SectionTerm({ term }: SectionTermProps) {
    return (
        <div className="absolute top-5 right-5 lg:static lg:flex lg:items-center lg:justify-center">
            <div className="flex items-center gap-1.5 font-medium text-gray-600">
                <CalendarDays size={14} className="text-gray-400" />
                <span className="truncate text-xs font-semibold lg:text-sm lg:font-medium">
                    {term}
                </span>
            </div>
        </div>
    );
}

export default SectionTerm;
