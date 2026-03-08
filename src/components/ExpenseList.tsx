"use client"
import { useExpenseStore } from "../store/useExpenseStore";
import { Pagination } from "./Pagination";
import { ExpenseCard } from "./ExpenseCard";

export function ExpenseList() {
    const { expenses } = useExpenseStore();

    return (
        <div>
            <div 
                className="
                    grid grid-cols-1
                    md:grid-cols-2 lg:grid-cols-3
                    xl:grid-cols-4
                    gap-4 md:gap-[1.5rem] lg:gap-6
                    justify-items-center
            ">
                {expenses.map((expense, index) => {
                        return <ExpenseCard key={expense.id} expense={expense} index={index}/>
                })}
            </div>
            <Pagination />
        </div>
    );
}