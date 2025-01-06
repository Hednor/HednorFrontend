import React from "react";

interface PaginationSectionProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * 9 + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(currentPage * 9, totalPages * 9)}</span> of{" "}
                    <span className="font-medium">{totalPages * 9}</span> results
                </p>
                <nav className="isolate inline-flex space-x-2 rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:text-gray-300"
                    >
                        Prev
                    </button>
                    {generatePageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                } rounded-md transition duration-200 ease-in-out`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:text-gray-300"
                    >
                        Next
                    </button>
                </nav>
            </div>

            {/* For smaller screens, only show page numbers without prev/next buttons */}
            <div className="sm:hidden flex justify-center space-x-2">
                {/* Display only page numbers without the Prev/Next buttons on smaller screens */}
                {generatePageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            } rounded-md transition duration-200 ease-in-out`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaginationSection;
