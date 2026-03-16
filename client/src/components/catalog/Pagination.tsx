import clsx from 'clsx';
import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    jumpValue: string;
    totalPages: number;
    currentPage: number;
    setJumpValue: React.Dispatch<React.SetStateAction<string>>;
    handleJumpPage: (e: React.FormEvent) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
    jumpValue,
    totalPages,
    currentPage,
    setJumpValue,
    handleJumpPage,
    setCurrentPage,
}: PaginationProps) {
    const paginationRange = useMemo(() => {
        const range: (number | 'dots')[] = [];
        const pages = new Set<number>();
        pages.add(1);
        pages.add(totalPages);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i >= 1 && i <= totalPages) {
                pages.add(i);
            }
        }
        const sorted = Array.from(pages).sort((a, b) => a - b);

        for (let i = 0; i < sorted.length; i++) {
            range.push(sorted[i]);

            if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
                range.push('dots');
            }
        }
        return range;
    }, [currentPage, totalPages]);

    return (
        <nav className="w-full border-t border-gray-200 bg-gray-50/80 py-3">
            <div className="flex w-full max-w-340 items-center justify-center px-4 sm:justify-between sm:px-10">
                <div className="flex h-11 items-center gap-1.5">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-2.5 text-gray-500 transition-all hover:bg-gray-100 disabled:opacity-30"
                    >
                        <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>
                    <div className="flex items-center gap-1">
                        {paginationRange.map((item, i) =>
                            item === 'dots' ? (
                                <span
                                    key={`dots-${i}`}
                                    className="px-1 text-sm text-gray-400"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    key={`page-${item}`}
                                    onClick={() => setCurrentPage(item)}
                                    className={clsx(
                                        'h-10 w-10 cursor-pointer rounded-lg text-sm font-bold transition-all',
                                        currentPage === item
                                            ? 'bg-theme-blue text-white shadow-sm'
                                            : 'hover:text-theme-blue text-gray-500 hover:bg-gray-100',
                                    )}
                                >
                                    {item}
                                </button>
                            ),
                        )}
                    </div>
                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-2.5 text-gray-500 transition-all hover:bg-gray-100 disabled:opacity-30"
                    >
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                </div>
                <form onSubmit={handleJumpPage} className="hidden items-center gap-2 border-l border-gray-200 pl-4 sm:flex">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Go to
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={jumpValue}
                        onChange={(e) => setJumpValue(e.target.value.replace(/\D/g, ''))}
                        placeholder={currentPage.toString()}
                        className="focus:border-theme-blue h-9 w-12 rounded-lg border border-gray-200 bg-white text-center text-sm font-bold text-gray-700 placeholder-gray-300 focus:outline-none"
                    />
                </form>
            </div>
        </nav>
    );
}

export default Pagination;
