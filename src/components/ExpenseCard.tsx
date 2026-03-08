"use client"
import { forwardRef, useState } from "react";
import { Expense } from "@prisma/client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useExpenseStore } from "../store/useExpenseStore";
import { deleteExpenseOnServer } from "../actions/expense";
import { ExpenseForm } from "./ExpenseForm";

interface ExpenseCardProps {
    expense: Expense;
    index: number;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({ 
        opacity: 1, y: 0,
        transition: { duration: 0.4, ease: "easeOut", delay: index * 0.1 }
    }),
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP',
});

export const ExpenseCard = forwardRef<HTMLDivElement, ExpenseCardProps>(
    ({ expense, index }, ref) => {
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const { removeExpense, addExpense, setNotification } = useExpenseStore();
        
        const amountInPounds = expense.amount / 100;
        const formattedAmount = currencyFormatter.format(amountInPounds);

        const handleDelete = async () => {
            const expenseCopy = { ...expense };
            removeExpense(expense.id);
            try {
                await deleteExpenseOnServer(expense.id);
            } catch(error) {
                console.log('Failed to delete: ', error);
                setNotification('Failed to delete. Please try again.', 'error');
                addExpense(expenseCopy);
            }
        }

        return (
            <>
                <motion.div
                    ref={ref}
                    layout
                    custom={index} 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible" 
                    exit="exit"
                    className="flex flex-col bg-indigo-50 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 md:p-[1.25rem] rounded-xl w-full max-w-sm"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-blue-950 mb-4 truncate pr-2">{expense.title}</h3>
                        <div className="flex gap-2 md:gap-[0.5rem] shrink-0">
                            <button 
                                type="button" 
                                onClick={() => setIsEditModalOpen(true)}
                                className="text-slate-400 hover:text-blue-600 p-1.5 md:p-[0.375rem] rounded-lg transition-all duration-200 active:scale-90"
                            >
                                <PencilSquareIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
                            </button>

                            <motion.button 
                                type="button" 
                                onClick={handleDelete}
                                whileHover={{ rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.3 } }}
                                className="text-slate-400 hover:text-red-500 p-1.5 md:p-[0.375rem] rounded-lg active:scale-90"
                            >
                                <TrashIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
                            </motion.button>
                        </div>
                    </div>
                    
                    <dl className="flex flex-col gap-2">
                        <div className="flex">
                            <dt className="text-sm text-slate-500 w-24">Category:</dt>
                            <dd className="text-sm text-slate-700 font-medium">{expense.category}</dd>
                        </div>
                        <div className="flex">
                            <dt className="text-sm text-slate-500 w-24">Date:</dt>
                            <dd className="text-sm text-slate-700">{new Date(expense.date).toLocaleDateString('en-GB')}</dd>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                            <dt className="text-sm text-slate-500">Amount:</dt>
                            <dd className="text-lg font-bold text-blue-950">{formattedAmount}</dd>
                        </div>
                    </dl>
                </motion.div>

                <AnimatePresence>
                    {isEditModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/20 backdrop-blur-sm p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                            >
                                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
                                    <h2 className="text-xl font-bold text-blue-950">Edit Expense</h2>
                                    <button 
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-6 max-h-[80vh] overflow-y-auto">
                                    <ExpenseForm 
                                        initialData={expense} 
                                        onSuccess={() => setIsEditModalOpen(false)} 
                                    />
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </>
        );
    }
);

ExpenseCard.displayName = "ExpenseCard";