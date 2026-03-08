"use client"
import { useExpenseStore } from "../store/useExpenseStore";
import { Pagination } from "./Pagination";
import { ExpenseCard } from "./ExpenseCard";

export function ExpenseList() {
    const { expenses } = useExpenseStore();

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full flex-1  min-h-0 pb-4">
                <div 
                    className="
                        grid grid-cols-1
                        md:grid-cols-2 lg:grid-cols-3
                        xl:grid-cols-4
                        gap-4 md:gap-[1.5rem] lg:gap-6
                        justify-items-center
                        content-start /* Trzyma karty przyklejone do góry */
                ">
                    {expenses.map((expense, index) => {
                        return <ExpenseCard key={expense.id} expense={expense} index={index}/>
                    })}
                </div>
            </div>
            <div className="shrink-0 mt-4 md:mt-[1.5rem] w-full flex justify-center pt-2">
                <Pagination />
            </div>
        </div>
    );
}