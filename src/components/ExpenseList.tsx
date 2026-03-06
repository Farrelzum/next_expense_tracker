"use client"
import { Expense } from "@prisma/client";
import { useExpenseStore } from "../store/useExpenseStore";

export function ExpenseList() {
    const expenses: Expense[] = useExpenseStore(state => state.expenses);
    
    if (expenses.length === 0) {
        return(<p>No expenses yet. Add your first!</p>)
    }

    const currencyFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    return (
    <div>
        <h3>My Expenses:</h3>
        {expenses.map((expense) => {
            const amountInPounds = expense.amount / 100;
            const formattedAmount = currencyFormatter.format(amountInPounds); 

            return (
            <dl key={expense.id}>
                <div>
                    <dt>Title:  </dt>
                    <dd>{expense.title}</dd>
                </div>
                                <div>
                    <dt>Category: </dt>
                    <dd>{expense.category}</dd>
                </div>
                                <div>
                    <dt>Date: </dt>
                    <dd>{new Date(expense.date).toLocaleDateString('en-GB')}</dd>
                </div>
                <div>
                    <dt>Amount: </dt>
                    <dd>{formattedAmount}</dd>
                </div>
            </dl>
        );
    })}
</div>);
}