"use client"
import { useEffect, useState } from "react";
import { CATEGORIES } from "../constants/categories";
import { useExpenseStore } from "../store/useExpenseStore";
import { Notification } from "./Notification";

export function AddExpenseForm() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const addExpense = useExpenseStore((state) => state.addExpense);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => { document.body.style.overflow = 'unset'; }
    }, [isModalOpen]);

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

            {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="
                        fixed inset-0 bg-slate-900/60 backdrop-blur-sm
                        shadow-xl flex justify-center items-center
                ">
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="
                            bg-indigo-50 p-4 md:p-[2rem] lg:p-8
                            border border-blue-100 shadow-xl rounded-2xl
                            w-full max-w-md lg:max-w-2x1 mx-4
                            max-h-[90vh] flex flex-col overflow-y-auto">
                        <h3 className="
                        text-xl font-bold text-blue-950 mb-4 text-center">
                            Select Category
                        </h3>
                        <div className="
                        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                        gap-3 sm:gap-4 md:gap-[1.2rem] lg:gap-6
                        ">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id} type="button"
                                    onClick={() => {
                                        setCategory(cat.label)
                                        setIsModalOpen(false);
                                    }} className="
                                        flex flex-col items-center transition-all
                                        p-2 sm:p-3 md:p-[1rem] lg:p-5
                                        rounded-xl hover:bg-indigo-100/50
                                        border border-transparent hover:border-blue-100
                                    ">
                                    <cat.icon className="text-blue-600
                                        w-8 h-8 md:w-[2.5rem] md:h-[2.5rem] lg:w-12 lg:h-12
                                    "/>
                                    <span className="
                                        text-slate-600 font-medium text-center
                                        text-xs md:text-[0.8rem] lg:text-sm
                                        break-words leading-tight
                                    ">
                                        {cat.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="
                                w-full mt-6 p-3 
                                text-slate-500 font-medium 
                                hover:text-blue-950 hover:bg-indigo-100/50 
                                rounded-xl transition-colors
                                md:mt-[1.5rem] lg:mt-8
                            "
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                )}

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