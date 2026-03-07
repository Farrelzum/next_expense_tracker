"use client"
import { useEffect } from "react";
import { CATEGORIES } from "../constants/categories";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (bool: boolean) => void;
    setCategory: (label: string) => void;
}

export function CategoryModal({ isModalOpen, setIsModalOpen, setCategory }: ModalProps) {
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => { document.body.style.overflow = 'unset'; }
    }, [isModalOpen]);
    
    return (<div
                onClick={() => setIsModalOpen(false)}
                className="
                    fixed inset-0 bg-slate-900/60 backdrop-blur-sm
                    shadow-xl flex justify-center items-center
            ">
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className="
                        bg-indigo-50 p-4 md:p-[2rem] lg:p-8
                        border border-blue-100 shadow-xl rounded-2xl
                        w-full max-w-md lg:max-w-2x1 mx-4
                        max-h-[90vh] flex flex-col overflow-y-auto">
                    <h3 className="
                    text-xl font-bold text-blue-950 mb-4 text-center">
                        Select Category
                    </h3>
                    <div className="
                    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                    gap-3 sm:gap-4 md:gap-[1.2rem] lg:gap-6
                    ">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id} type="button"
                                onClick={() => {
                                    setCategory(cat.label)
                                    setIsModalOpen(false);
                                }} className="
                                    flex flex-col items-center transition-all
                                    p-2 sm:p-3 md:p-[1rem] lg:p-5
                                    rounded-xl hover:bg-indigo-100/50
                                    border border-transparent hover:border-blue-100
                                ">
                                <cat.icon className="text-blue-600
                                    w-8 h-8 md:w-[2.5rem] md:h-[2.5rem] lg:w-12 lg:h-12
                                "/>
                                <span className="
                                    text-slate-600 font-medium text-center
                                    text-xs md:text-[0.8rem] lg:text-sm
                                    break-words leading-tight
                                ">
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="
                            w-full mt-6 p-3 
                            text-slate-500 font-medium 
                            hover:text-blue-950 hover:bg-indigo-100/50 
                            rounded-xl transition-colors
                            md:mt-[1.5rem] lg:mt-8
                        "
                    >
                        Cancel
                    </button>
                </div>
            </div>);
}