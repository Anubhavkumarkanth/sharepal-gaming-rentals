"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Dialog from "@/components/Dialog";
import { useStore } from "@/lib/store";
import { addDays, daysBetween, formatDate, isSameDay } from "@/lib/format";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type MonthProps = {
  month: Date;
  from: Date | null;
  to: Date | null;
  earliest: Date;
  onSelect: (day: Date) => void;
};

function Month({ month, from, to, earliest, onSelect }: MonthProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingBlanks = new Date(year, monthIndex, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, monthIndex, i + 1));

  return (
    <div>
      <p className="mb-2 text-center text-sm font-semibold text-navy">
        {month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </p>
      <div className="grid grid-cols-7 text-center text-xs text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const isEndpoint = (from && isSameDay(day, from)) || (to && isSameDay(day, to));
          const isInRange = from && to && day > from && day < to;
          return (
            <button
              key={day.getDate()}
              onClick={() => onSelect(day)}
              disabled={day < earliest}
              aria-label={day.toDateString()}
              aria-pressed={Boolean(isEndpoint)}
              className={`h-9 text-sm ${
                isEndpoint
                  ? "rounded-md bg-brand font-semibold text-white"
                  : isInRange
                    ? "bg-brand-50 text-brand"
                    : "rounded-md text-navy hover:bg-surface disabled:text-muted/40 disabled:hover:bg-transparent"
              }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DatePicker() {
  const { isDatePickerOpen, setDatePickerOpen, dates, setDates } = useStore();
  // Earliest delivery date offered is tomorrow.
  const [earliest] = useState(() => addDays(new Date(), 1));
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(earliest.getFullYear(), earliest.getMonth(), 1));

  // Start from the saved dates each time the picker opens. Adjusting state during
  // render (instead of in an effect) avoids a flash of the old selection.
  const [wasOpen, setWasOpen] = useState(false);
  if (isDatePickerOpen !== wasOpen) {
    setWasOpen(isDatePickerOpen);
    if (isDatePickerOpen) {
      setFrom(dates?.from ?? null);
      setTo(dates?.to ?? null);
    }
  }

  // First click picks delivery, second click picks pickup. Clicking a day on or
  // before the delivery date starts a new selection.
  function selectDay(day: Date) {
    if (!from || to || day <= from) {
      setFrom(day);
      setTo(null);
    } else {
      setTo(day);
    }
  }

  function apply() {
    if (from && to) setDates({ from, to });
    setDatePickerOpen(false);
  }

  const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  const canGoBack = visibleMonth > new Date(earliest.getFullYear(), earliest.getMonth(), 1);

  return (
    <Dialog
      isOpen={isDatePickerOpen}
      onClose={() => setDatePickerOpen(false)}
      label="Select rental dates"
      className="mx-auto mb-0 mt-auto w-full max-w-none rounded-t-xl p-0 sm:m-auto sm:w-[640px] sm:rounded-xl"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-base font-bold text-navy">Select rental dates</h2>
        <button onClick={() => setDatePickerOpen(false)} className="rounded p-1 text-muted hover:text-ink" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pt-4 text-sm">
        <div className={`rounded-lg border px-3 py-2 ${!from ? "border-brand" : "border-line"}`}>
          <p className="text-xs text-muted">Delivery</p>
          <p className="font-semibold text-navy">{from ? formatDate(from) : "Select date"}</p>
        </div>
        <div className={`rounded-lg border px-3 py-2 ${from && !to ? "border-brand" : "border-line"}`}>
          <p className="text-xs text-muted">Pickup</p>
          <p className="font-semibold text-navy">{to ? formatDate(to) : "Select date"}</p>
        </div>
      </div>

      <div className="relative px-5 py-4">
        <button
          onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
          disabled={!canGoBack}
          className="absolute left-4 top-3.5 rounded p-1 text-navy disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => setVisibleMonth(nextMonth)} className="absolute right-4 top-3.5 rounded p-1 text-navy" aria-label="Next month">
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="grid gap-6 sm:grid-cols-2">
          <Month month={visibleMonth} from={from} to={to} earliest={earliest} onSelect={selectDay} />
          <div className="hidden sm:block">
            <Month month={nextMonth} from={from} to={to} earliest={earliest} onSelect={selectDay} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-3">
        <p className="text-sm text-muted">{from && to ? `${daysBetween(from, to)} days` : "Select delivery and pickup"}</p>
        <div className="flex gap-2">
          {dates && (
            <button
              onClick={() => {
                setDates(null);
                setDatePickerOpen(false);
              }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-ink"
            >
              Clear
            </button>
          )}
          <button
            onClick={apply}
            disabled={!from || !to}
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-40"
          >
            Apply
          </button>
        </div>
      </div>
    </Dialog>
  );
}
