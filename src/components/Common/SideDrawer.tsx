// components/SideDrawer.tsx
import React from "react";
import { ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    width?: string;
    title: string;
    isBack: boolean;
    children: React.ReactNode;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
    isOpen,
    onClose,
    width = "400px",
    title,
    isBack,
    children,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 flex flex-col"
                        style={{ width }}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.7 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <div className="flex items-center">
                                {isBack && (
                                    <button
                                        onClick={onClose} // Assuming onBack is handled by the parent or removed
                                        className="p-2 rounded-full border hover:bg-gray-100 focus:outline-none"
                                        aria-label="Back"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                                    </button>
                                )}
                                <h2 className={`text-xl font-semibold text-gray-800 ${isBack ? 'ml-4' : ''}`}>
                                    {title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full border hover:bg-gray-100 focus:outline-none"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        {/* Content */}
                        <div className="overflow-y-auto content-scroll h-full">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
