import SearchBar from '../components/catalog/SearchBar';
import CourseList from '../components/catalog/course/CourseList';
import Pagination from '../components/catalog/Pagination';
import type { AppController } from '../hooks/useAppController';

interface CatalogPageProps {
    controller: AppController;
}

function CatalogPage({ controller }: CatalogPageProps) {
    const { data, state, refs, actions } = controller;

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="pt-6 bg-white border-b border-gray-50">
                <SearchBar
                    searchQuery={state.searchQuery}
                    setSearchQuery={actions.setSearchQuery}
                    lookupData={data.lookupData}
                />
            </div>
            <div ref={refs.scrollContainerRef} className="flex-1 overflow-y-auto">
                <CourseList
                    pagedCourses={data.pagedCourses}
                    activeFilters={data.activeFilters}
                    pinnedCourses={state.pinnedCourses}
                    setPinnedCourses={actions.setPinnedCourses}
                    expandedCourseIds={state.expandedCourseIds}
                    setExpandedCourseIds={actions.setExpandedCourseIds}
                    sectionsByCourseId={data.sectionsByCourseId}
                />
            </div>
            <Pagination
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                jumpValue={state.jumpValue}
                setCurrentPage={actions.setCurrentPage}
                setJumpValue={actions.setJumpValue}
                handleJumpPage={actions.handleJumpPage}
            />
        </div>
    );
}

export default CatalogPage;
