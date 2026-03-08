"use client"
import { useExpenseStore } from "../store/useExpenseStore";
import { motion, Variants } from "framer-motion";
import { Pagination } from "./Pagination";
import { ExpenseCard } from "./ExpenseCard";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.1, 
        },
    },
};

export function ExpenseList() {
    const { expenses } = useExpenseStore();

    const gridKey = expenses.length > 0 ? expenses.map(e => e.id).join('-') : 'empty';

    return (
        <div>
            <motion.div
                key={gridKey}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="
                    grid grid-cols-1
                    md:grid-cols-2 lg:grid-cols-3
                    xl:grid-cols-4
                    gap-4 md:gap-[1.5rem] lg:gap-6
            ">
                {expenses.map((expense) => {
                    return <ExpenseCard key={expense.id} expense={expense} />
            })}
            </motion.div>
            <Pagination />
        </div>
    );
}