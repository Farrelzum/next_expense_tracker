"use client"
import { Expense } from '@prisma/client';
import { useExpenseStore } from '../store/useExpenseStore';
import { useRef } from 'react';

interface StoreProps {
    initialExpenses: Expense[];
}

export function StoreInitializer({ initialExpenses }: StoreProps) {
    const initialized = useRef(false);

    if (!initialized.current) {
        useExpenseStore.setState({ expenses: initialExpenses});
        initialized.current = true;
    }

    return null;
}