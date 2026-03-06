import { prisma } from '../lib/prisma';
import { StoreInitializer } from '../components/StoreInitializer';
import { ExpenseList } from '../components/ExpenseList';
import { Expense } from '@prisma/client';

export default async function Home() {
    const expenses = await prisma.expense.findMany();

    const mockExpenses: Expense[] = [{
        id: '2',
        title: 'Zakupy na obiad',
        amount: 10000,
        category: 'Zakupy spożywcze',
        date: new Date(),
        createdAt: new Date(),
    }];

    return (
    <>
    <StoreInitializer initialExpenses={mockExpenses} />
    <ExpenseList />
    </>);
}