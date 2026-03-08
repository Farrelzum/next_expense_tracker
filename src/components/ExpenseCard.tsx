"use client"
import { Expense } from "@prisma/client";
import { motion, Variants } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useExpenseStore } from "../store/useExpenseStore";
import { deleteExpenseOnServer } from "../actions/expense";

interface ExpenseCardProps {
    expense: Expense;
}

const cardVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
    }
};

const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

export function ExpenseCard({ expense }: ExpenseCardProps) {
    const { removeExpense, addExpense } = useExpenseStore();
    const amountInPounds = expense.amount / 100;
    const formattedAmount = currencyFormatter.format(amountInPounds);

    const handleDelete = async () => {
        const expenseCopy = { ...expense };
        removeExpense(expense.id);
        try {
            await deleteExpenseOnServer(expense.id);
        }catch(error) {
            console.log('Unable to delete expense', error);
            addExpense(expenseCopy);
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            exit="exit"
            key={expense.id}
            className="
                flex flex-col
                bg-indigo-50 border border-blue-100
                shadow-sm hover:shadow-md transition-all duration-200
                p-5 rounded-xl
                w-full max-w-sm
        ">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-blue-950 mb-4">{expense.title}</h3>
                <button type="button" onClick={handleDelete}>
                    <TrashIcon className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem]" />
                </button>
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
                <div className="
                    flex justify-between items-center
                    mt-2 pt-2 border-t border-gray-100
                ">
                    <dt className="text-sm text-slate-500">Amount:</dt>
                    <dd className="text-lg font-bold text-blue-950">{formattedAmount}</dd>
                </div>
            </dl>
        </motion.div>
    );
}