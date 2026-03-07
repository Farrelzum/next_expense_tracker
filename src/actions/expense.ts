"use server"
import { prisma } from '../lib/prisma';
import { Expense } from "@prisma/client";

export async function createExpenseOnServer(newExpense: Omit<Expense, 'id' | "createdAt">) {
    
    try {
        const savedExpense = await prisma.expense.create({ data: newExpense });
        return savedExpense;
    } catch(error) {
        console.log(error);
        return;
    }
}