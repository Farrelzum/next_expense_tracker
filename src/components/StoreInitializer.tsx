"use client"
import { Expense } from '@prisma/client';
import { useExpenseStore } from '../store/useExpenseStore';
import { useRef } from 'react';

interface StoreProps {
    initialExpenses: Expense[];
    initialTotalPages: number;
}

export function StoreInitializer({ initialExpenses, initialTotalPages }: StoreProps) {
    const initialized = useRef(false);

    if (!initialized.current) {
        useExpenseStore.setState({
            expenses: initialExpenses,
            totalPages: initialTotalPages,
            currentPage: 1
        });
        initialized.current = true;
    }

    return null;
}