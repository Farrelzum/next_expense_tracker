import { Expense } from "@prisma/client";
import { create } from 'zustand';

interface ExpenseState {
    expenses: Expense[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    setExpensesData: (expenses: Expense[], totalPages: number, totalCount: number) => void;
    addExpense: (expense: Expense) => void;
    setCurrentPage: (page: number) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,

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

    setCurrentPage: (page) => set({ currentPage: page }),
}));