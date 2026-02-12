import SectionRow from './SectionRow';
import type { ApiSectionWithRelations } from '../../../types';

interface SectionProps {
    sections: ApiSectionWithRelations[];
}

function Sections({ sections }: SectionProps) {
    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-b-sm border-gray-200 bg-white shadow-inner">
                <div className="hidden grid-cols-[4rem_2fr_15rem_1.7fr_1fr] gap-2 border-b border-gray-100 bg-gray-50/80 px-6 py-2 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:grid">
                    <span>Section</span>
                    <span>Instructor</span>
                    <span>Days & Time</span>
                    <span>Location</span>
                    <span>Term</span>
                </div>
                <div className="divide-y divide-gray-100">
                    {sections.map((section) => (
                        <SectionRow key={section.id} section={section} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Sections;
