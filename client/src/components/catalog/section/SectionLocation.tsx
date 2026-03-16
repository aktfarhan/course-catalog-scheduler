import { MapPin } from 'lucide-react';

interface SectionLocationProps {
    location: string;
}

function SectionLocation({ location }: SectionLocationProps) {
    const lastSpace = location.lastIndexOf(' ');
    const building = lastSpace > 0 ? location.slice(0, lastSpace) : '';
    const room = lastSpace > 0 ? location.slice(lastSpace + 1) : location;

    return (
        <div className="flex items-center gap-2 lg:flex-col lg:justify-center">
            <span className="w-24 shrink-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:hidden">
                Location
            </span>
            <div className="flex items-center gap-1.5 font-medium text-gray-600">
                <MapPin size={14} className="shrink-0 text-gray-400" />
                <span className="truncate">
                    {building && <span className="lg:hidden 2xl:inline">{building} </span>}
                    {room}
                </span>
            </div>
        </div>
    );
}

export default SectionLocation;
