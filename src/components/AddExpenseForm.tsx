"use client"
import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { Notification } from "./Notification";
import { CategoryModal } from "./CategoryModal";

export function AddExpenseForm() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const addExpense = useExpenseStore((state) => state.addExpense);

    const handleSubmit = ((e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!title || !amount || !category || !date) {
            setError('Please fill in all fields before adding an expense.');
            return;
        }

        setError('');

        addExpense({
            id: crypto.randomUUID(),
            title: title,
            amount: Math.round(parseFloat(amount) * 100),
            category: category,
            date: new Date(date),
            createdAt: new Date(),
        });
        setTitle('');
        setAmount('');
        setCategory('');
        setDate('');
    }) 

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
                            setError('');
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
                            setError('');
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
                            setError('');
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
                            setError('');
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
                    className="
                        bg-blue-950 text-white font-medium
                        rounded-lg hover:bg-blue-900 transition-colors
                        mt-2 p-3 md:col-span-2
                ">Add</button>
            </form>

            {isModalOpen && <CategoryModal isModalOpen setIsModalOpen={setIsModalOpen} setCategory={setCategory}/>}

                {error && (
                    <Notification 
                        message={error} 
                        type="error" 
                        onClose={() => setError('')} 
                    />
                )}
        </>
    );
}