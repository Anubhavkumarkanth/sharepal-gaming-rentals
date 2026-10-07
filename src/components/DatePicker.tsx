"use client";

import { useState } from "react";
import { BadgePercent, CalendarClock, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import Dialog from "@/components/Dialog";
import { useStore } from "@/lib/store";
import { addDays, chargeableDays, formatFullDate, formatShortDate, isSameDay } from "@/lib/format";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
type Step = "delivery" | "pickup";

type MonthProps = {
  month: Date;
  from: Date | null;
  to: Date | null;
  isDisabled: (day: Date) => boolean;
  onSelect: (day: Date) => void;
};

function Month({ month, from, to, isDisabled, onSelect }: MonthProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingBlanks = new Date(year, monthIndex, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, monthIndex, i + 1));

  return (
    <div>
      <p className="mb-4 text-center text-sm font-medium text-ink">
        {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <div className="grid grid-cols-7 text-center text-xs text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d} className="pb-2">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1.5">
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
              disabled={isDisabled(day)}
              aria-label={formatFullDate(day)}
              aria-pressed={Boolean(isEndpoint)}
              className={`h-10 text-sm ${
                isEndpoint
                  ? "rounded-lg bg-lime font-semibold text-ink"
                  : isInRange
                    ? "bg-lime-50 text-ink"
                    : "rounded-lg text-ink hover:bg-page disabled:text-subtle/50 disabled:hover:bg-transparent"
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

function DateField({ label, value, placeholder, isActive, onClick }: { label: string; value: Date | null; placeholder: string; isActive: boolean; onClick: () => void }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-ink">
        {label} <span className="text-danger">*</span>
      </p>
      <button
        onClick={onClick}
        className={`flex h-11 w-full items-center gap-2 rounded-xl border-2 bg-white px-3 text-sm ${isActive ? "border-brand" : "border-white"}`}
      >
        <CalendarClock className="h-4 w-4 text-ink" aria-hidden />
        {value ? <span className="font-medium text-ink">{formatFullDate(value)}</span> : <span className="text-muted">{placeholder}</span>}
      </button>
    </div>
  );
}

export default function DatePicker() {
  const { isDatePickerOpen, setDatePickerOpen, dates, setDates } = useStore();
  // Same-day delivery exists on sharepal.in, so today (at midnight) is the earliest date.
  const [today] = useState(() => addDays(new Date(), 0));
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [step, setStep] = useState<Step>("delivery");
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  // Start from the saved dates each time the picker opens. Adjusting state during
  // render (instead of in an effect) avoids a flash of the old selection.
  const [wasOpen, setWasOpen] = useState(false);
  if (isDatePickerOpen !== wasOpen) {
    setWasOpen(isDatePickerOpen);
    if (isDatePickerOpen) {
      setFrom(dates?.from ?? null);
      setTo(dates?.to ?? null);
      setStep("delivery");
    }
  }

  // Delivery and pickup days are free, so pickup must be at least two days after
  // delivery to leave one chargeable day.
  const earliestPickup = from ? addDays(from, 2) : today;
  const isDisabled = (day: Date) => day < today || (step === "pickup" && day < earliestPickup);

  function selectDay(day: Date) {
    if (step === "delivery") {
      setFrom(day);
      if (to && to < addDays(day, 2)) setTo(null);
      setStep("pickup");
    } else {
      setTo(day);
    }
  }

  function apply() {
    if (from && to) setDates({ from, to });
    setDatePickerOpen(false);
  }

  const days = from && to ? chargeableDays(from, to) : 0;
  const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  const canGoBack = visibleMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const close = () => setDatePickerOpen(false);

  return (
    <Dialog
      isOpen={isDatePickerOpen}
      onClose={close}
      label="Select your dates"
      className="mx-0 mb-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-3xl bg-[#f2f2f2] p-0 lg:m-auto lg:w-[min(1280px,calc(100%-4rem))] lg:rounded-3xl"
    >
      <div className="relative grid gap-5 p-5 lg:grid-cols-[470px_minmax(0,1fr)] lg:gap-6 lg:p-6">
        <button onClick={close} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border-2 border-ink text-ink lg:right-6 lg:top-5" aria-label="Close">
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-5">
          <h2 className="pr-12 text-xl font-semibold text-ink lg:text-2xl">Select your Dates</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <DateField label="Delivery Date" value={from} placeholder="Select delivery date" isActive={step === "delivery"} onClick={() => setStep("delivery")} />
            <DateField label="Pickup Date" value={to} placeholder="Select pickup date" isActive={step === "pickup"} onClick={() => from && setStep("pickup")} />
          </div>

          <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-xs leading-relaxed text-navy">
            <Info className="mt-0.5 h-4 w-4 shrink-0 fill-brand text-white" aria-hidden />
            <span>
              <b>Same-day delivery</b> between <b>5PM and 11PM</b>. For future dates, you can select a specific time slot at
              checkout. We pickup between <b>9AM to 1PM</b>.
            </span>
          </p>

          {/* The calendar sits here on mobile, and in the right column on desktop */}
          <div className="lg:hidden">{renderCalendar()}</div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Your Rental Period:</p>
            <div className="flex items-center gap-8 rounded-xl border-2 border-white bg-white px-4 py-3">
              <p className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-ink">{String(days).padStart(2, "0")}</span>
                <span className="text-sm text-muted">{days === 1 ? "Day" : "Days"}</span>
              </p>
              <div className="text-xs text-ink">
                <p>Chargeable Period:</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  <CalendarClock className="h-4 w-4" aria-hidden />
                  {from && to ? `${formatShortDate(addDays(from, 1))} - ${formatShortDate(addDays(to, -1))}` : "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl bg-navy px-5 pb-5 pt-4 text-white">
            <BadgePercent className="absolute -left-1 -top-1 h-9 w-9 text-lime" aria-hidden />
            <p className="pl-8 text-xl font-bold italic text-lime lg:text-2xl">Save more with us!</p>
            <p className="mt-3 text-xs font-medium">We don&apos;t charge you for delivery and pickup days!</p>
          </div>

          <button
            onClick={apply}
            disabled={!from || !to}
            className="sticky bottom-0 h-12 rounded-full bg-brand text-lg font-medium text-white transition-colors hover:bg-brand-dark disabled:bg-line disabled:text-subtle"
          >
            Continue
          </button>
        </div>

        <div className="hidden pt-12 lg:block">{renderCalendar()}</div>
      </div>
    </Dialog>
  );

  // A render helper (not a component) so it shares this component's state.
  function renderCalendar() {
    return (
      <div className="relative rounded-3xl bg-white p-4 lg:p-6">
        <button
          onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
          disabled={!canGoBack}
          className="absolute left-4 top-3 grid h-8 w-8 place-items-center rounded-full border border-line text-ink disabled:opacity-30 lg:left-6 lg:top-5"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setVisibleMonth(nextMonth)}
          className="absolute right-4 top-3 grid h-8 w-8 place-items-center rounded-full border border-line text-ink lg:right-6 lg:top-5"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="grid gap-8 lg:grid-cols-2">
          <Month month={visibleMonth} from={from} to={to} isDisabled={isDisabled} onSelect={selectDay} />
          <div className="hidden lg:block">
            <Month month={nextMonth} from={from} to={to} isDisabled={isDisabled} onSelect={selectDay} />
          </div>
        </div>
      </div>
    );
  }
}
