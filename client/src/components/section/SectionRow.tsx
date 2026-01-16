import type { ApiSectionWithRelations } from '../../types';
import { useState } from 'react';

import SectionNumber from './SectionNumber';
import SectionInstructors from './SectionInstructors';
import SectionDaysTime from './SectionDaysTime';
import SectionLocation from './SectionLocation';
import SectionTerm from './SectionTerm';

function SectionRow({ section }: { section: ApiSectionWithRelations }) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (email: string | null | undefined, id: string) => {
        if (!email) return;
        navigator.clipboard.writeText(email);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const location = section.meetings[0]?.location ?? 'TBA';

    return (
        <div className="relative flex flex-col lg:grid lg:grid-cols-[4rem_2fr_15rem_1.7fr_1fr] gap-y-4 lg:gap-2 py-5 lg:py-3 text-sm px-5 border-t border-gray-100 hover:bg-slate-50/50 transition-colors group/row">
            <SectionNumber sectionNumber={section.sectionNumber} />
            <SectionInstructors
                instructors={section.instructors}
                copiedId={copiedId}
                onCopy={handleCopy}
            />
            <SectionDaysTime meetings={section.meetings} />
            <SectionLocation location={location} />
            <SectionTerm term={section.term} />
        </div>
    );
}

export default SectionRow;
