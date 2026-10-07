"use client";

import { useStore } from "@/lib/store";

export default function Toast() {
  const { toast } = useStore();

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 lg:bottom-6">
      {toast && <p className="rounded-lg bg-navy px-4 py-2.5 text-sm text-white shadow-card">{toast}</p>}
    </div>
  );
}
