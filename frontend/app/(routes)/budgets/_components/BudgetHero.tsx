/**
 * Decorative header art for the Budgets page: a calendar and a target with an arrow.
 * Positions itself against the page wrapper (top-right), so render it inside a header
 * that has no transform of its own.
 */
export function BudgetHero() {
  return (
    <svg
      viewBox="0 0 520 230"
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden w-[620px] xl:block"
    >
      <defs>
        <linearGradient id="bCal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "hsl(214 95% 94%)" }} />
          <stop offset="1" style={{ stopColor: "hsl(214 85% 76%)" }} />
        </linearGradient>
        <linearGradient id="bHead" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "hsl(217 88% 56%)" }} />
          <stop offset="1" style={{ stopColor: "hsl(217 80% 44%)" }} />
        </linearGradient>
        <linearGradient id="bTgt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--primary-glow)" }} />
          <stop offset="1" style={{ stopColor: "var(--primary)" }} />
        </linearGradient>
        <linearGradient id="bSwoosh" x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: "0" }}
          />
          <stop
            offset=".5"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: ".3" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--primary)", stopOpacity: ".22" }}
          />
        </linearGradient>
        <linearGradient id="bFadeY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="bMask">
          <rect width="520" height="230" fill="url(#bFadeY)" />
        </mask>
      </defs>
      <path
        mask="url(#bMask)"
        d="M0 175 C110 120 200 210 310 150 S470 80 520 55 V230 H0Z"
        fill="url(#bSwoosh)"
      />
      <path
        mask="url(#bMask)"
        d="M0 200 C120 150 210 225 320 175 S470 115 520 95"
        fill="none"
        stroke="url(#bSwoosh)"
        strokeWidth="3"
      />
      <g
        className="animate-float animate-delay-100"
        style={{ animationDuration: "6.5s" }}
      >
        <g
          transform="translate(286 118) rotate(-9)"
          style={{ filter: "drop-shadow(0 18px 18px rgba(0,50,90,.38))" }}
        >
          <rect
            x="-78"
            y="-62"
            width="156"
            height="124"
            rx="18"
            fill="url(#bCal)"
            stroke="#fff"
            strokeOpacity=".7"
            strokeWidth="1.5"
          />
          <path
            d="M-78 -44 A18 18 0 0 1 -60 -62 H60 A18 18 0 0 1 78 -44 V-30 H-78 Z"
            fill="url(#bHead)"
          />
          <rect
            x="-45"
            y="-78"
            width="10"
            height="30"
            rx="5"
            style={{ fill: "hsl(217 70% 36%)" }}
            stroke="#fff"
            strokeOpacity=".55"
          />
          <rect
            x="-5"
            y="-78"
            width="10"
            height="30"
            rx="5"
            style={{ fill: "hsl(217 70% 36%)" }}
            stroke="#fff"
            strokeOpacity=".55"
          />
          <rect
            x="35"
            y="-78"
            width="10"
            height="30"
            rx="5"
            style={{ fill: "hsl(217 70% 36%)" }}
            stroke="#fff"
            strokeOpacity=".55"
          />
          <rect
            x="-60"
            y="-12"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="-29"
            y="-12"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="2"
            y="-12"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="33"
            y="-12"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="-60"
            y="14"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="-29"
            y="14"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="2"
            y="14"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(214 95% 93%)" }}
            fillOpacity=".9"
          />
          <rect
            x="33"
            y="14"
            width="25"
            height="20"
            rx="6"
            style={{ fill: "hsl(217 85% 50%)" }}
          />
          <path
            d="M39 24 L44 29 L53 19"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g
        className="animate-float animate-delay-300"
        style={{ animationDuration: "5.5s" }}
      >
        <g
          transform="translate(434 118)"
          style={{ filter: "drop-shadow(0 18px 18px rgba(0,50,70,.4))" }}
        >
          <circle
            r="62"
            fill="url(#bTgt)"
            stroke="#fff"
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <circle r="46" fill="#fff" fillOpacity=".92" />
          <circle r="33" fill="url(#bTgt)" />
          <circle r="20" fill="#fff" fillOpacity=".92" />
          <circle r="9" style={{ fill: "var(--primary)" }} />
          <path
            d="M4 -4 L58 -58"
            stroke="hsl(217 70% 30%)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M54 -54 L68 -58 L62 -68 Z M54 -54 L58 -68 L70 -60 Z"
            style={{ fill: "hsl(217 70% 30%)" }}
            stroke="hsl(217 70% 30%)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g transform="translate(205 40)">
        <path
          className="animate-pulse"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(500 175) scale(1.1)">
        <path
          className="animate-pulse animate-delay-200"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(170 130) scale(.7)">
        <path
          className="animate-pulse animate-delay-300"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(360 12) scale(.55)">
        <path
          className="animate-pulse animate-delay-100"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(240 200) scale(.6)">
        <path
          className="animate-pulse animate-delay-500"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
