"use client"
import { useEffect, useRef, useState } from "react";
import { getExpenses } from "../actions/expense";
import { useExpenseStore } from "../store/useExpenseStore";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseList } from "./ExpenseList";
import { Notification } from "./Notification";
import { PlusIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const viewVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function ExpensePage() {
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {
            currentPage,
            setExpensesData,
            totalCount,
            setNotification,
            notification
        } = useExpenseStore();
    const successAudioRef = useRef<HTMLAudioElement | null>(null);
    
    useEffect(() => {
        let isMounted = true; 
        
        setIsLoading(true); 

        async function load() {
            try {
                const response = await getExpenses(currentPage); 
                if (isMounted) {
                    setExpensesData(response.expenses, response.totalPages, response.totalCount);
                }
            } catch (error) {
                console.error("Failed to fetch:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        
        load();

        return () => {
            isMounted = false; 
        };
    }, [currentPage, setExpensesData]);

    useEffect(() => {
        successAudioRef.current = new Audio('/sounds/ka-ching.mp3');
        successAudioRef.current.volume = 0.4;
    }, []);

    const handleAddSuccess = () => {
        if (successAudioRef.current) {
            successAudioRef.current.currentTime = 0; 
            successAudioRef.current.play().catch(e => console.log("Audio playback blocked: ", e));
        }

        setNotification('Expense added succesfully');
        setIsAdding(false);
    }

    return (
        <div className="min-h-screen bg-indigo-100/50 p-4 md:p-[2rem] lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 md:mb-[2.5rem] lg:mb-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-950">
                            {isAdding ? "New Expense" : "My Expenses"}
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base">
                            {isAdding ? "Fill in the details below" : `Total transactions: ${totalCount}`}
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                        animate={{
                            backgroundColor: isAdding ? "#ffffff" : "#172554", 
                            color: isAdding ? "#475569" : "#ffffff",           
                            borderColor: isAdding ? "#dbeafe" : "#172554",    
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => setIsAdding(!isAdding)}
                        className={`
                            flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium
                        `}
                    >
                        {isAdding ? (
                            <motion.div 
                                key="back"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="flex items-center gap-2"
                            >
                                <motion.span
                                    initial={{ rotate: 180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </motion.span>
                                <span className="whitespace-nowrap">Back</span>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="add"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center gap-2"
                            >
                                <motion.span
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <PlusIcon className="w-5 h-5" />
                                </motion.span>
                                <span>Add Expense</span>
                            </motion.div>
                        )}
                    </motion.button>
                </div>

                <main className="flex justify-center">
                    <AnimatePresence mode="wait">
                        {isAdding ? (
                            <motion.div
                                key="form-view"
                                variants={viewVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="w-full flex justify-center">
                                <AddExpenseForm onSuccess={handleAddSuccess} />
                            </motion.div>
                        ) : totalCount === 0 ? (
                            <motion.div
                                key="empty-view"
                                variants={viewVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="w-full flex justify-center py-20">
                                    <div className="
                                        bg-indigo-50 border border-blue-100
                                        p-10 rounded-2xl text-center max-w-md shadow-sm
                                    ">
                                    <div className="
                                        bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4
                                        flex items-center justify-center
                                    ">
                                        <PlusIcon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-blue-950 mb-2">No expenses yet</h3>
                                    <p className="text-slate-600 mb-6">Your list is empty. Start by adding your first transaction!</p>
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Add your first expense →
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list-view"
                                variants={viewVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="w-full">
                                 <ExpenseList />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {notification && (
                    <Notification 
                        message={notification.message} 
                        type={notification.type} 
                        onClose={() => setNotification(null)} 
                    />
)}
                </main>
            </div>
        </div>
    );
}