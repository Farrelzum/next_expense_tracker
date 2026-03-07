import { Expense } from "@prisma/client";
import { create } from 'zustand';

interface ExpenseState {
    expenses: Expense[];
    setExpenses: (newExpenses: Expense[]) => void;
    addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    setExpenses: (newExpenses) => set({ expenses: newExpenses }),
    addExpense: (expense) => set((state) => ({ expenses: [expense, ...state.expenses]}))
}));