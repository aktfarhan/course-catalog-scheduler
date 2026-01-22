import CourseCard from './CourseCard';
import type { ApiCourseWithSections } from '../../../../types';

export default function CourseList({
    pinnedData,
    expandedId,
    setExpandedId,
    selectedSections,
    sectionsByCourseId,
    selectedTerm,
    onSectionSelect,
    formatMeetingTime,
}: any) {
    return (
        <>
            {pinnedData.map((course: ApiCourseWithSections) => {
                console.log(course);
                const isExpanded = expandedId === course.id;
                const activeSectionId = selectedSections.get(course.id);
                const sections = (sectionsByCourseId.get(course.id) || []).filter(
                    (s: any) => s.term === selectedTerm,
                );

                return (
                    <CourseCard
                        key={course.id}
                        course={course}
                        isExpanded={isExpanded}
                        activeSectionId={activeSectionId}
                        sections={sections}
                        onToggle={() => setExpandedId(isExpanded ? null : course.id)}
                        onSectionSelect={onSectionSelect}
                        formatMeetingTime={formatMeetingTime}
                    />
                );
            })}
        </>
    );
}
