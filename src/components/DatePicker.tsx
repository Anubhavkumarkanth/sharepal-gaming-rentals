"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Truck, PackageCheck, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { addDays, longDate, rentalDays, sameDay, startOfDay } from "@/lib/format";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const PRESETS = [
  { label: "1 day", days: 1 },
  { label: "3 days", days: 3 },
  { label: "1 week", days: 7 },
  { label: "1 month", days: 30 },
];

function Month({
  month,
  from,
  to,
  hover,
  min,
  onPick,
  onHover,
}: {
  month: Date;
  from: Date | null;
  to: Date | null;
  hover: Date | null;
  min: Date;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: first.getDay() }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];
  const end = to ?? (from && hover && hover > from ? hover : null);

  return (
    <div className="w-full">
      <p className="mb-3 text-center text-[15px] font-bold text-navy">
        {month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </p>
      <div className="grid grid-cols-7 text-center text-[11.5px] font-semibold text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7" onMouseLeave={() => onHover(null)}>
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const disabled = d < min;
          const isStart = from && sameDay(d, from);
          const isEnd = end && sameDay(d, end);
          const inRange = from && end && d > from && d < end;
          return (
            <div
              key={i}
              className={`relative py-0.5 ${inRange ? "bg-brand-50" : ""} ${isStart && end ? "rounded-l-full bg-brand-50" : ""} ${
                isEnd && from ? "rounded-r-full bg-brand-50" : ""
              }`}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => onPick(d)}
                onMouseEnter={() => onHover(d)}
                aria-label={longDate(d)}
                aria-pressed={!!(isStart || isEnd)}
                className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-[13.5px] font-medium transition ${
                  isStart || isEnd
                    ? "bg-brand font-bold text-white shadow-[0_4px_12px_rgb(30_79_216/0.35)]"
                    : disabled
                      ? "cursor-not-allowed text-muted/35 line-through"
                      : "text-navy hover:bg-brand-100"
                }`}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DatePicker() {
  const { datesOpen, setDatesOpen, dates, setDates } = useStore();
  // Earliest delivery is tomorrow — gear is packed and checked the day before.
  const [min] = useState(() => addDays(startOfDay(new Date()), 1));
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);
  const [view, setView] = useState(() => new Date(min.getFullYear(), min.getMonth(), 1));

  // Sync the draft with the saved selection each time the sheet opens.
  useEffect(() => {
    if (!datesOpen) return;
    /* eslint-disable react-hooks/set-state-in-effect -- reset the draft on open */
    setFrom(dates?.from ?? null);
    setTo(dates?.to ?? null);
    const anchor = dates?.from ?? min;
    setView(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    /* eslint-enable react-hooks/set-state-in-effect */
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDatesOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [datesOpen, dates, min, setDatesOpen]);

  if (!datesOpen) return null;

  const pick = (d: Date) => {
    if (!from || to || d <= from) {
      setFrom(d);
      setTo(null);
    } else {
      setTo(d);
    }
  };
  const next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
  const canGoBack = view > new Date(min.getFullYear(), min.getMonth(), 1);
  const days = from && to ? rentalDays(from, to) : null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/50 backdrop-blur-[2px] animate-fade sm:items-center sm:p-4" onClick={() => setDatesOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dates-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-[760px] animate-hint overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:rounded-3xl"
      >
        <div className="flex items-start justify-between border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 id="dates-title" className="text-lg font-bold text-navy">
              Select rental dates
            </h2>
            <p className="text-sm text-muted">{!from ? "Choose your delivery date" : !to ? "Now choose your pickup date" : "Looks good — apply to see totals"}</p>
          </div>
          <button onClick={() => setDatesOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 pt-4 sm:px-6">
          {[
            { label: "Delivery", value: from, Icon: Truck, active: !from },
            { label: "Pickup", value: to, Icon: PackageCheck, active: !!from && !to },
          ].map(({ label, value, Icon, active }) => (
            <div key={label} className={`rounded-xl border-[1.5px] px-3 py-2 transition ${active ? "border-brand bg-brand-50/50" : "border-line"}`}>
              <p className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-muted">
                <Icon className="h-3.5 w-3.5" aria-hidden /> {label}
              </p>
              <p className="text-[15px] font-bold text-navy">{value ? longDate(value) : "—"}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 px-5 pt-3 sm:px-6">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                const start = from ?? min;
                setFrom(start);
                setTo(addDays(start, p.days));
              }}
              className={`h-8 rounded-full border px-3 text-[12.5px] font-semibold transition ${
                days === p.days ? "border-brand bg-brand text-white" : "border-line text-navy hover:border-brand/40"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="relative px-5 pb-2 pt-4 sm:px-6">
          <button
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            disabled={!canGoBack}
            className="absolute left-4 top-3.5 grid h-8 w-8 place-items-center rounded-full hover:bg-surface disabled:opacity-30"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView(next)}
            className="absolute right-4 top-3.5 grid h-8 w-8 place-items-center rounded-full hover:bg-surface"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="grid gap-8 sm:grid-cols-2">
            <Month month={view} from={from} to={to} hover={hover} min={min} onPick={pick} onHover={setHover} />
            <div className="hidden sm:block">
              <Month month={next} from={from} to={to} hover={hover} min={min} onPick={pick} onHover={setHover} />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-line bg-white px-5 py-4 sm:px-6">
          <div className="text-sm">
            {days ? (
              <>
                <span className="text-lg font-extrabold text-navy">{days}</span> <span className="text-muted">day{days > 1 ? "s" : ""} rental</span>
              </>
            ) : (
              <span className="text-muted">Pick two dates</span>
            )}
          </div>
          <div className="flex gap-2">
            {dates && (
              <button
                onClick={() => {
                  setDates(null);
                  setDatesOpen(false);
                }}
                className="h-11 rounded-xl px-4 text-sm font-semibold text-muted hover:bg-surface"
              >
                Clear
              </button>
            )}
            <button
              disabled={!from || !to}
              onClick={() => {
                if (from && to) setDates({ from, to });
                setDatesOpen(false);
              }}
              className="h-11 rounded-xl bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Apply dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
