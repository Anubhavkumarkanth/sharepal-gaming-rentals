"use client";

import { useEffect, useRef } from "react";

// Thin wrapper over the native <dialog>: showModal() gives us focus trapping,
// Escape to close and an inert background without extra code.
export default function Dialog({
  isOpen,
  onClose,
  label,
  className = "",
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      // A click whose target is the <dialog> itself landed on the backdrop.
      onClick={(e) => e.target === ref.current && onClose()}
      className={`text-ink backdrop:bg-navy/50 ${className}`}
    >
      {isOpen && children}
    </dialog>
  );
}
