import { useCallback } from 'react';
import type { ApiDepartmentWithRelations } from '../types';

interface UseFilterLogicParams {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    departmentMap: Map<string, ApiDepartmentWithRelations>;
}

// Constants defining categories of filters for sidebar filtering logic c
export const FILTER_CATEGORIES = {
    DAYS: new Set(['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']),
    TERMS: new Set(['2025 Fall', '2026 Winter', '2026 Spring', '2026 Summer']),
    TYPES: new Set(['Lecture', 'Discussion']),
    TIMES: new Set(['Morning', 'Afternoon', 'Evening']),
};

export function useFilterLogic({
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    departmentMap,
}: UseFilterLogicParams) {
    const handleSidebarFilter = useCallback(
        (type: string, value: string | number) => {
            const valueStr = String(value).trim();
            const normalizedValue = valueStr.toLowerCase();

            // Clear all filters if requested
            if (type === 'clear') {
                setSearchQuery('');
                setCurrentPage(1);
                return;
            }

            // Parse current search query into tokens
            const currentTokens = searchQuery
                ? searchQuery
                      .split(',')
                      .map((token) => token.trim())
                      .filter(Boolean)
                : [];

            // Normalize tokens for case-insensitive comparison
            const normalizedTokens = currentTokens.map((token) => token.toLowerCase());

            // Check if the filter token is already selected
            const isAlreadySelected = normalizedTokens.includes(normalizedValue);

            let newTokens: string[];
            if (isAlreadySelected) {
                // Remove the token if already selected
                newTokens = currentTokens.filter((_, i) => normalizedTokens[i] !== normalizedValue);
            } else {
                // Remove tokens in the same category before adding the new one
                newTokens = currentTokens.filter((token) => {
                    switch (type) {
                        case 'term':
                            return !FILTER_CATEGORIES.TERMS.has(token);
                        case 'type':
                            return !FILTER_CATEGORIES.TYPES.has(token);
                        case 'time':
                            return !FILTER_CATEGORIES.TIMES.has(token);
                        case 'dept':
                            return !departmentMap.has(token.toUpperCase());
                        default:
                            return true;
                    }
                });
                newTokens.push(valueStr);
            }

            // Update the search query and reset to first page
            setSearchQuery(newTokens.join(', '));
            setCurrentPage(1);
        },
        [searchQuery, setSearchQuery, setCurrentPage, departmentMap],
    );

    return { handleSidebarFilter };
}
