import { formatMoney } from "@/lib/budget";
import { toMinor } from "@/lib/account";
import type { BudgetWeek } from "@/lib/types";

type Props = { weekly: BudgetWeek[]; limitMinor: number; currency: string };

const W = 420,
  H = 210,
  L = 44,
  R = 18,
  T = 20,
  B = 30;
const PW = W - L - R,
  PH = H - T - B;

const niceStep = (x: number) => {
  const pow = 10 ** Math.floor(Math.log10(x));
  const n = x / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
};
const compact = (v: number) =>
  v >= 1000 ? `${+(v / 1000).toFixed(1)}k` : String(v);

export function BudgetChart({ weekly, limitMinor, currency }: Props) {
  if (weekly.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No spending recorded yet this month.
      </p>
    );
  }

  const spent = weekly.map((w) => toMinor(w.spent) / 100); // major units, for plotting only
  const limit = limitMinor / 100;
  const step = niceStep(Math.max(limit, ...spent, 1) / 4);
  const max = step * 4;
  const x = (i: number) =>
    L + (weekly.length === 1 ? PW / 2 : (PW * i) / (weekly.length - 1));
  const y = (v: number) => T + PH - (Math.min(v, max) / max) * PH;

  const line = spent
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(spent.length - 1).toFixed(1)} ${y(0)} L${x(0).toFixed(1)} ${y(0)} Z`;
  const last = spent.length - 1;
  const label = formatMoney(Math.round(spent[last] * 100), currency);
  const lw = label.length * 7 + 16;

  return (
    <div>
      <div className="mb-1 flex justify-end gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary" /> Spent
        </span>
        {limit > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="h-0 w-4 border-t-2 border-dashed border-primary-glow" />{" "}
            Budget Limit
          </span>
        )}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Cumulative spending by week compared to the budget limit"
      >
        <defs>
          <linearGradient id="bArea" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0"
              style={{ stopColor: "var(--primary)", stopOpacity: ".28" }}
            />
            <stop
              offset="1"
              style={{ stopColor: "var(--primary)", stopOpacity: "0" }}
            />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1={L}
              x2={W - R}
              y1={y(i * step)}
              y2={y(i * step)}
              stroke="currentColor"
              strokeOpacity=".1"
            />
            <text
              x={L - 8}
              y={y(i * step) + 4}
              textAnchor="end"
              fontSize="10"
              fill="currentColor"
              fillOpacity=".6"
            >
              {compact(i * step)}
            </text>
          </g>
        ))}

        {limit > 0 && (
          <line
            x1={L}
            x2={W - R}
            y1={y(limit)}
            y2={y(limit)}
            strokeDasharray="5 4"
            strokeWidth="1.5"
            style={{ stroke: "var(--primary-glow)" }}
          />
        )}

        <path d={area} fill="url(#bArea)" />
        <path
          d={line}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ stroke: "var(--primary)" }}
        />
        {spent.map((v, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(v)}
            r={i === last ? 5 : 4}
            style={{ fill: "var(--card)", stroke: "var(--primary)" }}
            strokeWidth="2.5"
          />
        ))}

        {weekly.map((w, i) => (
          <text
            key={w.label}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fontSize="10.5"
            fill="currentColor"
            fillOpacity=".7"
          >
            {w.label}
          </text>
        ))}

        <g
          transform={`translate(${Math.min(x(last) - lw / 2, W - R - lw)} ${Math.max(y(spent[last]) - 30, 2)})`}
        >
          <rect
            width={lw}
            height="22"
            rx="11"
            style={{ fill: "var(--foreground)" }}
          />
          <text
            x={lw / 2}
            y="15"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            style={{ fill: "var(--background)" }}
          >
            {label}
          </text>
        </g>
      </svg>
    </div>
  );
}
