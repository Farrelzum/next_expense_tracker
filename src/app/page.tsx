import { StoreInitializer } from '../components/StoreInitializer';
import ExpensePage from '../components/ExpensePage';
import { getExpenses } from '../actions/expense';

export default async function Home() {
    const initialData = await getExpenses(1, 8);

    return (
        <>
            <StoreInitializer
                initialExpenses={initialData.expenses}
                initialTotalPages={initialData.totalPages}/>
            <ExpensePage />
        </>
    );
}