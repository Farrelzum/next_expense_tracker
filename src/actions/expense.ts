"use server"
import { prisma } from '../lib/prisma';
import { Expense } from "@prisma/client";

export async function getExpenses(
    page: number = 1, pageSize: number = 8
) {
    try {
        const skip = (page - 1) * pageSize;

        const [expenses, totalCount] = await Promise.all([
            prisma.expense.findMany({
                skip: skip,
                take: pageSize,
                orderBy: { date: 'asc' },
            }),
            prisma.expense.count()
        ]);
        return {
            expenses: expenses,
            totalPages: Math.ceil(totalCount / pageSize),
            totalCount: totalCount
        };

    } catch (error) {
        console.error("Error fetching expenses::", error);
        return { expenses: [], totalPages: 1, totalCount: 0 };
    }
}

export async function createExpenseOnServer(newExpense: Omit<Expense, 'id' | "createdAt">) {
    
    try {
        const savedExpense = await prisma.expense.create({ data: newExpense });
        return savedExpense;
    } catch(error) {
        console.log('Unable to create expense: ', error);
        return;
    }
}

export async function deleteExpenseOnServer(id: string) {
  try {
    const deletedExpense = await prisma.expense.delete({ where: {id}})
    return deletedExpense;
  } catch(error) {
    console.log('Unable to delete expense: ', error);
    return
  }
}

export async function updateExpenseOnServer(id: string, expenseData: Omit<Expense, 'id' | 'createdAt'>) {
  try {
    const updatedExpense = await prisma.expense.update({
      where: {id}, data: expenseData
    });

    return updatedExpense;
  }catch(error) {
    console.log('Unable to update expense: ', error);
    return;
  }
}