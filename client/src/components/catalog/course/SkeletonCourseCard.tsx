function SkeletonCourseCard() {
    return (
        <div className="mx-4 mt-4 max-w-7xl sm:mx-10">
            <div className="flex flex-col items-stretch overflow-hidden rounded-xl border-2 border-gray-200 bg-white lg:flex-row">
                <div className="hidden min-w-14 border-r-2 border-gray-100 lg:block" />
                <div className="flex flex-1 flex-col items-stretch md:flex-row">
                    <div className="flex-1 p-5 md:p-6">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="mt-3 flex gap-3">
                            <div className="h-5 w-16 animate-pulse rounded bg-gray-100" />
                            <div className="h-5 w-24 animate-pulse rounded bg-gray-100" />
                            <div className="h-5 w-32 animate-pulse rounded bg-gray-100" />
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
                        </div>
                    </div>
                    <div className="my-6 hidden w-px bg-gray-200 md:block" />
                    <div className="flex w-full flex-col gap-3 border-t-2 border-gray-100 bg-gray-50 p-5 md:w-64 md:border-t-0 md:bg-white md:p-6">
                        <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCourseCard;
