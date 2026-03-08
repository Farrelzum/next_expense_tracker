"use client"
import { useExpenseStore } from "../store/useExpenseStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function Pagination() {
    const currentPage = useExpenseStore(state => state.currentPage);
    const totalPages = useExpenseStore(state => state.totalPages);
    const setCurrentPage = useExpenseStore(state => state.setCurrentPage);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-3 md:gap-[1rem] mt-10 md:mt-[3rem] w-full">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                    flex items-center justify-center p-2.5 md:p-[0.75rem]
                    rounded-xl bg-white border border-blue-100 shadow-sm
                    text-blue-950 hover:bg-indigo-50 hover:border-blue-200 hover:shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm
                    transition-all duration-200
                "
            >
                <ChevronLeftIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
            </motion.button>

            <div className="
                flex items-center bg-white px-5 py-2.5 md:px-[1.5rem] md:py-[0.75rem] 
                rounded-xl border border-blue-100 shadow-sm
            ">
                <span className="text-sm md:text-[1rem] font-medium text-slate-500">
                    Page <span className="text-blue-950 font-bold mx-1">{currentPage}</span> of {totalPages}
                </span>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                    flex items-center justify-center p-2.5 md:p-[0.75rem]
                    rounded-xl bg-white border border-blue-100 shadow-sm
                    text-blue-950 hover:bg-indigo-50 hover:border-blue-200 hover:shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm
                    transition-all duration-200
                "
            >
                <ChevronRightIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
            </motion.button>
        </div>
    );
}