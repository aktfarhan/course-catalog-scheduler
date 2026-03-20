import clsx from 'clsx';
import SearchBar from '../components/catalog/SearchBar';
import Pagination from '../components/catalog/Pagination';
import CourseList from '../components/catalog/course/CourseList';
import type { AppController } from '../hooks/useAppController';

interface CatalogPageProps {
    data: AppController['data'];
    state: AppController['state'];
    refs: AppController['refs'];
    actions: AppController['actions'];
}

function CatalogPage({ data, state, refs, actions }: CatalogPageProps) {
    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="border-b border-gray-50 bg-white pt-6">
                <SearchBar
                    lookupData={data.lookupData}
                    searchQuery={state.searchQuery}
                    setSearchQuery={actions.setSearchQuery}
                />
            </div>
            <div
                ref={refs.scrollContainerRef}
                className={clsx(
                    'flex-1 pb-4 [scrollbar-color:#94a3b8_transparent] [scrollbar-width:thin]',
                    data.isLoading ? 'overflow-y-hidden' : 'overflow-y-auto',
                )}
            >
                <CourseList
                    isLoading={data.isLoading}
                    pagedCourses={data.pagedCourses}
                    activeFilters={data.activeFilters}
                    pinnedCourses={state.pinnedCourses}
                    setPinnedCourses={actions.setPinnedCourses}
                    expandedCourseIds={state.expandedCourseIds}
                    sectionsByCourseId={data.sectionsByCourseId}
                    setExpandedCourseIds={actions.setExpandedCourseIds}
                />
            </div>
            <Pagination
                jumpValue={state.jumpValue}
                isLoading={data.isLoading}
                totalPages={state.totalPages}
                currentPage={state.currentPage}
                setJumpValue={actions.setJumpValue}
                setCurrentPage={actions.setCurrentPage}
                handleJumpPage={actions.handleJumpPage}
            />
        </div>
    );
}

export default CatalogPage;
