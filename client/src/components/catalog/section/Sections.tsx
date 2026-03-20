import SectionRow from './SectionRow';
import type { ApiSectionWithRelations } from '../../../types';

interface SectionsProps {
    sections: ApiSectionWithRelations[];
}

function Sections({ sections }: SectionsProps) {
    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-b-sm bg-white shadow-inner lg:min-w-175">
                <div className="hidden grid-cols-[4.5rem_1.2fr_15rem_1.1fr_0.8fr] gap-5 border-b border-gray-100 bg-gray-50/80 px-8 py-2 text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase lg:grid">
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
