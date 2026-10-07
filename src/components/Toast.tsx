"use client";

import { useStore } from "@/lib/store";

export default function Toast() {
  const { toast } = useStore();

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
      {toast && <p className="rounded-lg bg-navy px-4 py-2.5 text-sm text-white shadow-card">{toast}</p>}
    </div>
  );
}
