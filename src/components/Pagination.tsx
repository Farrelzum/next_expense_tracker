"use client"
import { useExpenseStore } from "../store/useExpenseStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function Pagination() {
    const currentPage = useExpenseStore(state => state.currentPage);
    const totalPages = useExpenseStore(state => state.totalPages);
    const setCurrentPage = useExpenseStore(state => state.setCurrentPage);

    if (totalPages <= 1) return null;

    const getButtonClass = (isDisabled: boolean) => `
        flex items-center justify-center 
        p-2.5 md:p-[0.75rem]
        rounded-lg transition-all duration-200 shadow-md
        ${isDisabled 
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-80' 
            : 'bg-blue-950 text-white hover:bg-blue-900 active:scale-[0.98]'
        }
    `;

    return (
        <div className="flex items-center justify-center gap-3 md:gap-[1rem] mt-10 md:mt-[3rem] w-full pb-8">
            <motion.button
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={getButtonClass(currentPage === 1)}
            >
                <ChevronLeftIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
            </motion.button>

            <div className="
                flex items-center bg-indigo-50 px-5 py-2.5 md:px-[1.5rem] md:py-[0.75rem] 
                rounded-lg border border-blue-100 shadow-sm
            ">
                <span className="text-sm md:text-[1rem] font-medium text-slate-600">
                    Page <span className="text-blue-950 font-bold mx-1">{currentPage}</span> of {totalPages}
                </span>
            </div>

            <motion.button
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={getButtonClass(currentPage === totalPages)}
            >
                <ChevronRightIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
            </motion.button>
        </div>
    );
}