import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    jumpValue: string;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setJumpValue: React.Dispatch<React.SetStateAction<string>>;
    handleJumpPage: (e: React.FormEvent) => void;
}

function Pagination({
    currentPage,
    totalPages,
    jumpValue,
    setCurrentPage,
    setJumpValue,
    handleJumpPage,
}: PaginationProps) {
    return (
        <div className="fixed bottom-10 left-0 right-0 z-50 pointer-events-none">
            {/* 
        Increased padding from px-4 sm:px-6 to px-8 sm:px-16 
        for a significantly larger margin around the ribbon.
    */}
            <div className="max-w-350 w-full min-w-[320px] mx-auto px-8 sm:px-16">
                {/* This div spans the full width of its parent (max-w-350 minus the new padding) */}
                <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-gray-200 py-2.5 px-5 rounded-2xl flex items-center justify-between gap-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] w-full">
                    <div className="flex items-center gap-1.5 h-11">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((page) => Math.max(1, page - 1))
                            }
                            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-600 disabled:opacity-20 cursor-pointer transition-all"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                const isFirst = page === 1;
                                const isLast = page === totalPages;
                                const isCurrent = page === currentPage;
                                const isNeighbor =
                                    Math.abs(page - currentPage) <= 1;

                                if (
                                    isFirst ||
                                    isLast ||
                                    isCurrent ||
                                    isNeighbor
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={clsx(
                                                'w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer',
                                                !isFirst &&
                                                    !isLast &&
                                                    !isCurrent &&
                                                    'hidden md:flex items-center justify-center',
                                                currentPage === page
                                                    ? 'bg-[#005a8c] text-white'
                                                    : 'text-gray-400 hover:bg-gray-50 hover:text-[#005a8c]'
                                            )}
                                        >
                                            {page}
                                        </button>
                                    );
                                }
                                if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return (
                                        <span
                                            key={page}
                                            className="text-gray-300 px-0.5 select-none hidden sm:inline text-[10px]"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                )
                            }
                            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-600 disabled:opacity-20 cursor-pointer transition-all"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Jump to Box */}
                    <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
                        <form
                            onSubmit={handleJumpPage}
                            className="flex items-center gap-2"
                        >
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                                Go to
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={jumpValue}
                                onChange={(e) =>
                                    setJumpValue(
                                        e.target.value.replace(/\D/g, '')
                                    )
                                }
                                placeholder={currentPage.toString()}
                                className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg text-center text-xs font-bold focus:border-[#005a8c] focus:outline-none transition-all placeholder-gray-300"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
