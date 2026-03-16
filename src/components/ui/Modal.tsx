"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.35 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: { duration: 0.2 },
  },
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — warm charcoal/70 */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[90] bg-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`pointer-events-auto w-full ${sizeClasses[size]} max-h-[90vh] bg-white rounded-2xl shadow-2xl shadow-charcoal/15 gold-border overflow-hidden flex flex-col`}
              role="dialog"
              aria-modal="true"
              aria-label={title || "Modal"}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15">
                  <h2 className="text-xl font-heading font-semibold text-charcoal">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 text-charcoal/80 hover:text-saffron hover:bg-saffron/5 rounded-lg transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Close button when no title */}
              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 text-charcoal/80 hover:text-saffron hover:bg-saffron/5 rounded-lg transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              )}

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
