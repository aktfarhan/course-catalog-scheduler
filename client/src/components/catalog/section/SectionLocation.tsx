import { MapPin } from 'lucide-react';

interface SectionLocationProps {
    location: string;
}

function SectionLocation({ location }: SectionLocationProps) {
    return (
        <div className="flex flex-row items-center gap-2 lg:flex-col lg:justify-center">
            <span className="w-24 shrink-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:hidden">
                Location
            </span>
            <div className="flex items-center gap-1.5 font-medium text-gray-600">
                <MapPin size={14} className="text-gray-400" />
                <span className="truncate">{location}</span>
            </div>
        </div>
    );
}

export default SectionLocation;
