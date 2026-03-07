"use client"
import { Expense } from "@prisma/client";
import { useExpenseStore } from "../store/useExpenseStore";

export function ExpenseList() {
    const expenses: Expense[] = useExpenseStore(state => state.expenses);
    
    if (expenses.length === 0) {
    return(
        <div className="flex justify-center items-center min-h-[50vh]"> 
            <div className="
                flex flex-col items-center
                bg-indigo-100/50 p-6 md:p-[2rem] lg:p-10
                border border-blue-100 rounded-xl shadow-sm
                text-center
            ">
                <p className="text-lg font-medium text-blue-950 mb-2">
                    No expenses yet
                </p>
                <p className="text-base text-slate-600">
                    Add your first expense to get started!
                </p>
            </div>
        </div>
    );
}

    const currencyFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    return (
        <div className="
            min-h-screen bg-indigo-100/50 p-4
            md:p-[2rem] lg:p-10
        ">
            <h2 className="
                text-2xl font-bold text-blue-950
                mb-6 md:mb-[1.5rem] lg:mb-8
            ">
                My Expenses:
            </h2>
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4    
                gap-4 md:gap-[1.5rem] lg:gap-6
            ">
                {expenses.map((expense) => {
                    const amountInPounds = expense.amount / 100;
                    const formattedAmount = currencyFormatter.format(amountInPounds);
                    return (
                    <div key={expense.id} className="
                        flex flex-col
                        bg-indigo-50 border border-blue-100
                        shadow-sm hover:shadow-md transition-all duration-200
                        p-5 rounded-xl
                        w-full max-w-sm
                    ">
                        <h3 className="text-lg font-bold text-blue-950 mb-4">{expense.title}</h3>
                        <dl className="flex flex-col gap-2">
                            <div className="flex">
                                <dt className="text-sm text-slate-500 w-24">Category:</dt>
                                <dd className="text-sm text-slate-700 font-medium">{expense.category}</dd>
                            </div>
                
                            <div className="flex">
                                <dt className="text-sm text-slate-500 w-24">Date:</dt>
                                <dd className="text-sm text-slate-700">{new Date(expense.date).toLocaleDateString('en-GB')}</dd>
                            </div>
                            <div className="
                                flex justify-between items-center
                                mt-2 pt-2 border-t border-gray-100
                            ">
                                <dt className="text-sm text-slate-500">Amount:</dt>
                                <dd className="text-lg font-bold text-blue-950">{formattedAmount}</dd>
                            </div>
                        </dl>
                    </div>
                );
                        })}
            </div>
        </div>
    );
}