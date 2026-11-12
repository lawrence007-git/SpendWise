"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Quote } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts";

const trendData = [
  { month: "Jun", income: 4200, expenses: 3100 },
  { month: "Jul", income: 4200, expenses: 3450 },
  { month: "Aug", income: 4550, expenses: 2980 },
  { month: "Sep", income: 4300, expenses: 3320 },
  { month: "Oct", income: 4800, expenses: 3050 },
  { month: "Nov", income: 4800, expenses: 2760 },
];

const points = [
  "Every income and expense in one place",
  "Monthly budgets with clear progress",
  "Reports that show where money flows",
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function MiniStat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-base font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] font-medium text-success">{delta}</p>
    </div>
  );
}

function MiniDashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-elevated">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">
            November overview
          </p>
          <p className="font-display text-sm font-bold">Dashboard</p>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-destructive/70" />
          <span className="size-2 rounded-full bg-warning/70" />
          <span className="size-2 rounded-full bg-success/70" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <MiniStat label="Income" value={currency.format(4800)} delta="+8.4%" />
        <MiniStat
          label="Expenses"
          value={currency.format(2760)}
          delta="-9.5%"
        />
        <MiniStat label="Net flow" value={currency.format(2040)} delta="+38%" />
      </div>

      <div className="mt-3 rounded-lg border border-border bg-background/60 p-2">
        <p className="text-xs font-semibold">Cash flow trend</p>
        {/* No ResponsiveContainer needed; explicit dimensions prevent -1 errors */}
        <div className="mt-2 flex justify-center overflow-hidden">
          <AreaChart
            width={260}
            height={120}
            data={trendData}
            margin={{ top: 6, right: 4, left: 4, bottom: 0 }}
          >
            <defs>
              <linearGradient id="authIncomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="authExpenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#authIncomeFill)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="var(--chart-3)"
              strokeWidth={2}
              fill="url(#authExpenseFill)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}

export function AuthVisual() {
  return (
    <>
      <aside className="auth-visual-surface relative hidden min-h-0 overflow-hidden lg:flex lg:flex-col">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 size-[26rem] rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -top-24 size-96 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-xl px-10 pt-8 xl:px-16">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="SpendWise home"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-white/15 shadow-soft backdrop-blur">
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 16.5 9 11l3.5 3.5L20 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 7h5v5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              SpendWise
            </span>
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-5 px-10 py-5 xl:px-16">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight xl:text-4xl">
              Know where every dollar goes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              SpendWise turns scattered notes and spreadsheets into one clear
              picture — so your next money decision is an easy one.
            </p>
            <ul className="mt-5 space-y-2.5">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm font-medium"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  <span className="text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative text-foreground">
            <div
              className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-white/10 blur-2xl"
              aria-hidden
            />
            <MiniDashboard />
          </div>

          <figure className="hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur [@media(min-height:900px)]:block">
            <Quote className="size-5 opacity-60" aria-hidden />
            <blockquote className="mt-2 text-sm leading-relaxed">
              “I finally see where my salary disappears each month. The budgets
              alone paid for the switch.”
            </blockquote>
            <figcaption className="mt-2 text-xs font-medium text-white/70">
              Maya R. — SpendWise beta user
            </figcaption>
          </figure>
        </div>
      </aside>
    </>
  );
}
