import { XCircleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

interface NotificationProps {
    message: string;
    type?: 'error' | 'success';
    onClose: () => void;
}

export function Notification({ message, type = 'error', onClose }: NotificationProps) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const isError = type === 'error';
    
    const colors = isError 
        ? 'bg-red-50 border-red-200 text-red-700' 
        : 'bg-emerald-50 border-emerald-200 text-emerald-700';
        
    const Icon = isError ? XCircleIcon : CheckCircleIcon;

    return (
        <div className={`
            fixed bottom-4 left-1/2 -translate-x-1/2 z-50 
            w-[calc(100%-2rem)] max-w-md
            md:bottom-[2rem]
            flex items-center justify-between gap-3
            border rounded-xl shadow-lg
            p-3 md:p-[1rem]
            animate-slide-up-fade
            transition-all duration-300
            ${colors}
        `}>
            <div className="flex items-center gap-2 md:gap-[0.75rem]">
                <Icon className="w-5 h-5 md:w-[1.5rem] md:h-[1.5rem] flex-shrink-0" />
                <span className="text-sm md:text-[0.9rem] font-medium leading-tight">
                    {message}
                </span>
            </div>
            
            <button 
                type="button" 
                onClick={onClose}
                className="hover:opacity-60 transition-opacity p-1"
                aria-label="Close notification"
            >
                <XMarkIcon className="w-4 h-4 md:w-[1.25rem] md:h-[1.25rem]" />
            </button>
        </div>
    );
}