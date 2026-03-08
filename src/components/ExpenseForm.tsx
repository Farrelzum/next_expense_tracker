"use client"
import { createExpenseOnServer, updateExpenseOnServer } from "../actions/expense";
import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { Notification } from "./Notification";
import { CategoryModal } from "./CategoryModal";
import { Expense } from "@prisma/client";

interface ExpenseFormProps {
    onSuccess: () => void;
    initialData?: Expense;
}

export function ExpenseForm({ onSuccess, initialData }: ExpenseFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [amount, setAmount] = useState(
        initialData ? (initialData.amount / 100).toString() : '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [date, setDate] = useState(
        initialData ?
            new Date(initialData.date).toISOString().split('T')[0] : ''
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { 
            addExpense,
            updateExpense,
            notification,
            setNotification
        } = 
            useExpenseStore();

const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!title || !amount || !category || !date) {
            setNotification('Please fill in all fields before saving.', 'error');
            return;
        }

        setNotification(null);
        setIsSubmitting(true);
        
        try {
            const expensePayload = {
                title: title,
                amount: Math.round(parseFloat(amount) * 100),
                category: category,
                date: new Date(date), 
            };

            if (initialData?.id) {
                const updatedExpense = await updateExpenseOnServer(initialData.id, expensePayload);
                
                if (updatedExpense) {
                    updateExpense(initialData.id, updatedExpense);
                    onSuccess();
                } else {
                    setNotification('Failed to update expense', 'error');
                }
            } else {
                const newlyCreatedExpense = await createExpenseOnServer(expensePayload);
                
                if (newlyCreatedExpense) {
                    addExpense(newlyCreatedExpense);
                    onSuccess();
                } else {
                    setNotification('Failed to save expense', 'error');
                }
            }
        } catch (error) {
            setNotification('A network error occurred. Please try again.', 'error');
            console.log('A network error occurred', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <form 
                onSubmit={handleSubmit}
                className="
                    grid grid-cols-1 md:grid-cols-2
                    gap-4 bg-indigo-50
                    border border-blue-100 shadow-sm
                    rounded-xl p-5 md:p-[2rem] md:gap-[1.5rem]
                    lg:p-10 lg:gap-8
                    w-full
            ">
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="title"
                    className="text-sm font-medium text-slate-500">
                        What did you buy
                    </label>
                    <input 
                        id="title" type="text"
                        value={title} onChange={(e) => {
                            setTitle(e.target.value);
                            setNotification(null);
                        }}
                        className="
                            bg-white border border-blue-100 rounded-lg p-2.5 
                            text-blue-950 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all
                        "
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="amount"
                    className="text-sm font-medium text-slate-500">
                        How much?
                    </label>
                    <input 
                        id="amount" type="number" step="0.01"
                        value={amount} onChange={(e) => {
                            setAmount(e.target.value);
                            setNotification(null);
                        }}
                        className="
                            bg-white border border-blue-100 rounded-lg p-2.5 
                            text-blue-950 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all
                        "
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-500">
                        Category
                    </label>
                    <button 
                        type="button" 
                        onClick={() => {
                            setIsModalOpen(true);
                            setNotification(null);
                        }}
                        className={`
                            bg-white border border-blue-100 rounded-lg p-2.5 
                            text-blue-950 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all
                            hover:bg-indigo-100/50 text-center
                            ${category ?
                                'text-blue-950 font-medium' : 'text-slate-400'}
                        `}
                    >
                        {category ? category : "-- Choose category --"}
                    </button>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="date"
                    className="text-sm font-medium text-slate-500">
                        Date
                    </label>
                    <input
                        id="date" type="date"
                        value={date} onChange={(e) => {
                            setDate(e.target.value);
                            setNotification(null);
                        }}
                        className={`
                            bg-white border border-blue-100 rounded-lg p-2.5 
                            text-blue-950 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all
                            ${date ? 'text-blue-950' : 'text-slate-400'}
                        `}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                        flex items-center justify-center gap-2
                        mt-2 p-3 md:p-[0.75rem] md:col-span-2
                        font-medium rounded-lg transition-all duration-200
                        ${isSubmitting 
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-80' 
                            : 'bg-blue-950 text-white hover:bg-blue-900 shadow-md active:scale-[0.98]'
                        }
                    `}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 md:w-[1.25rem] md:h-[1.25rem] border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                            <span>{initialData ? 'Saving...' : 'Adding...'}</span>
                        </>
                    ) : (
                        initialData ? 'Save Changes' : 'Add Expense'
                    )}
                </button>
            </form>

            {isModalOpen && <CategoryModal isModalOpen setIsModalOpen={setIsModalOpen} setCategory={setCategory}/>}

                {notification && (
                    <Notification 
                        message={notification.message} 
                        type={notification.type} 
                        onClose={() => setNotification(null)} 
                    />
)}
        </>
    );
}