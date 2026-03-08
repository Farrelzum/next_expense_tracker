import { Expense } from "@prisma/client";
import { create } from 'zustand';

interface ExpenseState {
    expenses: Expense[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    notification: { message: string; type: 'error' | 'success' } | null;
    setNotification: (msg: string | null, type?: 'error' | 'success') => void;
    setExpensesData: (expenses: Expense[], totalPages: number, totalCount: number) => void;
    addExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
    updateExpense: (id: string, updatedExpense: Expense) => void;
    setCurrentPage: (page: number) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    notification: null,

    setNotification: (message, type = 'error') => {
        set({ notification: message ? { message, type } : null })
    },

    setExpensesData: (expenses, totalPages, totalCount) => set({ 
        expenses, 
        totalPages,
        totalCount
    }),

    addExpense: (expense) => set((state) => {
        const newExpenses = [expense, ...state.expenses];
        
        if (newExpenses.length > 8) newExpenses.pop();
        
        return { 
            expenses: newExpenses,
            totalCount: state.totalCount + 1
        };
    }),

    removeExpense: (id) => set((state) => {
        const newExpensesList = state.expenses.filter((expense) => {
            return expense.id !== id;
        })

        return {
            expenses: newExpensesList,
            totalCount: state.totalCount - 1
        };
    }),

    updateExpense: (id, updatedExpense) => set((state) => {
        const newExpensesList = state.expenses.map((expense) => {
            if (expense.id === id) {
                return updatedExpense; 
            }
        
            return expense;
        });

        return {
            expenses: newExpensesList
        };
    }),

    setCurrentPage: (page) => set({ currentPage: page }),
}));