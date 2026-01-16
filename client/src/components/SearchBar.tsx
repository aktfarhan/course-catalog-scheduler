import React, { useMemo } from 'react';
import { Search, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { parseSearchInput } from '../filters/parseSearchInput';

interface LookupData {
    courseMap: Map<string, any>;
    departmentMap: Map<string, any>;
    departmentTitleToCode: Map<string, string>;
}

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (search: string) => void;
    lookupData: LookupData;
}

function SearchBar({
    searchQuery,
    setSearchQuery,
    lookupData,
}: SearchBarProps) {
    // Memoize parser results
    const { tokens } = useMemo(() => {
        return parseSearchInput(searchQuery, lookupData);
    }, [searchQuery, lookupData]);

    return (
        <div className="max-w-7xl mb-4 sm:mx-10 mx-4">
            <div className="relative w-full group">
                <Search
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors"
                />

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses (e.g. Fall 2026, CS110, Smith)..."
                    className="w-full h-14 px-14 text-base font-medium border-2 rounded-xl border-gray-200 
                               bg-white text-gray-900 outline-none shadow-sm transition-all
                               focus:border-theme-blue focus:ring-4 focus:ring-blue-500/5"
                    spellCheck={false}
                />

                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Render validation chips below the bar */}
            {searchQuery && (
                <div className="flex flex-wrap gap-2 mt-3 px-2">
                    {tokens
                        .filter(
                            (t) =>
                                t.type !== 'delimiter' && t.text.trim() !== ''
                        )
                        .map((token, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                    token.isRecognized
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-600 border-red-200'
                                }`}
                                title={token.error}
                            >
                                {token.isRecognized ? (
                                    <CheckCircle2 size={12} />
                                ) : (
                                    <AlertCircle size={12} />
                                )}
                                <span className="opacity-70">
                                    {token.type === 'departmentCode'
                                        ? 'DEPT'
                                        : token.type === 'courseCode'
                                        ? 'COURSE'
                                        : token.type.toUpperCase()}
                                    :
                                </span>
                                <span>{token.text}</span>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
