import { prisma } from '../lib/prisma';
import { StoreInitializer } from '../components/StoreInitializer';

export default async function Home() {
    const expenses = await prisma.expense.findMany();

    console.log(expenses);
    <StoreInitializer initialExpenses={expenses} />

    return (<h1>Wydatki</h1>);
}