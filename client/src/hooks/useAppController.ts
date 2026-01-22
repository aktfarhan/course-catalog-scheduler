import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useCatalogData } from './useCatalogData';
import { useFilterLogic } from './useFilterLogic';
import { useCoursePagination } from './useCoursePagination';
import type { ApiSectionWithRelations } from '../types';

export function useAppController() {
    // Fetch core catalog data
    const { courses, sections, sectionsByCourseId, lookupData, isLoading } = useCatalogData();

    // Ref for scrollable container to reset scroll on pagination or search change
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // ----- UI State -----
    const [activeTab, setActiveTab] = useState<'catalog' | 'calendar'>('catalog');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [showWeekend, setShowWeekend] = useState(false);
    const [jumpValue, setJumpValue] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // ----- Data State -----
    // Tracking user selections: pinned courses, selected sections per course, expanded course IDs
    const [pinnedCourses, setPinnedCourses] = useState<Set<number>>(new Set());
    const [selectedSections, setSelectedSections] = useState<Map<number, number>>(new Map());
    const [expandedCourseIds, setExpandedCourseIds] = useState<Set<number>>(new Set());

    // Apply search + filters + pagination to catalog data
    const pagination = useCoursePagination({
        courses,
        sections,
        lookupData,
        searchQuery,
        pinnedCourses,
        currentPage,
    });

    const { handleSidebarFilter } = useFilterLogic({
        searchQuery,
        setSearchQuery,
        setCurrentPage,
        departmentMap: lookupData.departmentMap,
    });

    // Reset scroll position whenever page or search query changes
    useEffect(() => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, searchQuery]);

    // ----- Action Handlers -----

    /**
     * Toggle section selection for a given course.
     * If the section is already selected, deselect it; otherwise select it.
     */
    const handleSectionSelect = useCallback((courseId: number, sectionId: number) => {
        setSelectedSections((prev) => {
            const newMap = new Map(prev);
            if (newMap.get(courseId) === sectionId) {
                newMap.delete(courseId);
            } else {
                newMap.set(courseId, sectionId);
            }
            return newMap;
        });
    }, []);

    // Handle jumping to a specific page via input form submission
    const handleJumpPage = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const page = parseInt(jumpValue);
            if (page >= 1 && page <= pagination.totalPages) {
                setCurrentPage(page);
                setJumpValue('');
            }
        },
        [jumpValue, pagination.totalPages],
    );

    /**
     * Handle schedule generation logic.
     * Disables generation if no pinned courses.
     */
    const handleGenerateSchedule = useCallback(async () => {
        if (pinnedCourses.size === 0) return;
        setIsGenerating(true);
        // Logic for AI schedule optimization trigger
        await new Promise((r) => setTimeout(r, 800));
        setIsGenerating(false);
    }, [pinnedCourses.size]);

    // ----- Export state, data, refs, and actions -----
    return {
        state: {
            activeTab,
            searchQuery,
            currentPage,
            jumpValue,
            isPanelOpen,
            showWeekend,
            isGenerating,
            pinnedCourses,
            selectedSections,
            expandedCourseIds,
            totalPages: pagination.totalPages,
            totalResults: pagination.totalResults,
        },
        data: {
            courses,
            lookupData,
            isLoading,
            sectionsByCourseId,
            pagedCourses: pagination.pagedCourses,
            activeFilters: pagination.activeFilters,
        },
        refs: { scrollContainerRef },
        actions: {
            setActiveTab,
            setSearchQuery,
            setCurrentPage,
            setJumpValue,
            setIsPanelOpen,
            setShowWeekend,
            setSelectedSections,
            setExpandedCourseIds,
            setPinnedCourses,
            handleSectionSelect,
            handleSidebarFilter,
            handleGenerateSchedule,
            handleJumpPage,
        },
    };
}

export type AppController = ReturnType<typeof useAppController>;
