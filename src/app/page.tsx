import { prisma } from '../lib/prisma';
import { StoreInitializer } from '../components/StoreInitializer';
import { ExpenseList } from '../components/ExpenseList';
import { Expense } from '@prisma/client';
import { AddExpenseForm } from '../components/AddExpenseForm';

export default async function Home() {
    const expenses = await prisma.expense.findMany();

    return (
        <>
            <StoreInitializer initialExpenses={expenses} />
            <AddExpenseForm />
            <ExpenseList />
        </>
    );
}