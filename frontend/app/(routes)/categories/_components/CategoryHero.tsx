/**
 * Decorative header art for the Categories page: glassy category tiles and a pie chart.
 * Positions itself against the page wrapper (top-right), so render it inside a header
 * that has no transform of its own.
 */
export function CategoryHero() {
  return (
    <svg
      viewBox="0 0 520 230"
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden w-[620px] xl:block"
    >
      <defs>
        <linearGradient id="cTileA" x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            style={{
              stopColor: "color-mix(in oklab,var(--primary-glow) 55%,#fff)",
            }}
          />
          <stop
            offset="1"
            style={{ stopColor: "color-mix(in oklab,var(--primary) 38%,#fff)" }}
          />
        </linearGradient>
        <linearGradient id="cTileB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "hsl(262 90% 88%)" }} />
          <stop offset="1" style={{ stopColor: "hsl(250 80% 72%)" }} />
        </linearGradient>
        <linearGradient id="cTileC" x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            style={{
              stopColor: "color-mix(in oklab,var(--primary-glow) 40%,#fff)",
            }}
          />
          <stop
            offset="1"
            style={{ stopColor: "color-mix(in oklab,var(--primary) 60%,#fff)" }}
          />
        </linearGradient>
        <linearGradient id="cPie1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--primary-glow)" }} />
          <stop offset="1" style={{ stopColor: "var(--primary)" }} />
        </linearGradient>
        <linearGradient id="cSwoosh" x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: "0" }}
          />
          <stop
            offset=".55"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: ".3" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--primary)", stopOpacity: ".22" }}
          />
        </linearGradient>
        <linearGradient id="cFadeY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="cMask">
          <rect width="520" height="230" fill="url(#cFadeY)" />
        </mask>
      </defs>
      <path
        mask="url(#cMask)"
        d="M0 150 C100 215 200 120 300 170 S460 70 520 40 V230 H0Z"
        fill="url(#cSwoosh)"
      />
      <path
        mask="url(#cMask)"
        d="M0 185 C110 230 220 150 320 190 S470 110 520 80"
        fill="none"
        stroke="url(#cSwoosh)"
        strokeWidth="3"
      />
      <g
        className="animate-float animate-delay-100"
        style={{ animationDuration: "7s" }}
      >
        <g
          transform="translate(452 106) rotate(-12)"
          style={{ filter: "drop-shadow(0 18px 18px rgba(0,50,70,.4))" }}
        >
          <path
            d="M0 0 L0.0 -54.0 A54 54 0 1 1 -18.5 50.7Z"
            fill="url(#cPie1)"
            stroke="#fff"
            strokeOpacity=".35"
          />
          <path
            d="M0 0 L-18.5 50.7 A54 54 0 0 1 -44.2 -31.0Z"
            style={{ fill: "color-mix(in oklab,var(--primary) 45%,#04202b)" }}
            stroke="#fff"
            strokeOpacity=".3"
          />
          <path
            transform="translate(-3.2 -6.2)"
            d="M0 0 L-44.2 -31.0 A54 54 0 0 1 -0.0 -54.0Z"
            style={{ fill: "var(--primary-glow)" }}
            stroke="#fff"
            strokeOpacity=".45"
          />
          <ellipse
            cx="-14"
            cy="-30"
            rx="22"
            ry="8"
            fill="#fff"
            fillOpacity=".3"
            transform="rotate(-25)"
          />
        </g>
      </g>
      <g
        className="animate-float animate-delay-200"
        style={{ animationDuration: "6s" }}
      >
        <g
          transform="translate(292 104) rotate(-14)"
          style={{ filter: "drop-shadow(0 16px 16px rgba(0,50,70,.35))" }}
        >
          <rect
            x="-39.0"
            y="-39.0"
            width="78"
            height="78"
            rx="20"
            fill="url(#cTileA)"
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth="1.5"
          />
          <rect
            x="-34.0"
            y="-34.0"
            width="68"
            height="33"
            rx="16"
            fill="#fff"
            fillOpacity=".28"
          />
          <g
            style={{
              stroke: "color-mix(in oklab,var(--primary) 70%,#052f3b)",
              fill: "none",
            }}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(1.00)"
          >
            <path d="M-12 -18 V-4 Q-12 3 -6 3 Q0 3 0 -4 V-18 M-6 -18 V20 M14 20 V-18 Q22 -10 21 4 H14" />
          </g>
        </g>
      </g>
      <g
        className="animate-float animate-delay-300"
        style={{ animationDuration: "5.5s" }}
      >
        <g
          transform="translate(396 148) rotate(12)"
          style={{ filter: "drop-shadow(0 16px 16px rgba(0,50,70,.35))" }}
        >
          <rect
            x="-35.0"
            y="-35.0"
            width="70"
            height="70"
            rx="18"
            fill="url(#cTileC)"
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth="1.5"
          />
          <rect
            x="-30.0"
            y="-30.0"
            width="60"
            height="29"
            rx="14"
            fill="#fff"
            fillOpacity=".28"
          />
          <g
            style={{ stroke: "hsl(222 70% 38%)", fill: "none" }}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(0.90)"
          >
            <path d="M-22 2 L0 -20 L22 2 M-15 -4 V20 H15 V-4 M-5 20 V6 H5 V20" />
          </g>
        </g>
      </g>
      <g className="animate-float " style={{ animationDuration: "6.5s" }}>
        <g
          transform="translate(362 62) rotate(8)"
          style={{ filter: "drop-shadow(0 16px 16px rgba(0,50,70,.35))" }}
        >
          <rect
            x="-46.0"
            y="-46.0"
            width="92"
            height="92"
            rx="24"
            fill="url(#cTileB)"
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth="1.5"
          />
          <rect
            x="-41.0"
            y="-41.0"
            width="82"
            height="39"
            rx="20"
            fill="#fff"
            fillOpacity=".28"
          />
          <g
            style={{ stroke: "hsl(262 60% 48%)", fill: "none" }}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(1.18)"
          >
            <path d="M-22 -18 H-15 L-9 8 H15 L21 -10 H-12" />
            <circle cx="-5" cy="17" r="3.5" style={{ fill: "#7c4dff" }} />
            <circle cx="12" cy="17" r="3.5" style={{ fill: "#7c4dff" }} />
          </g>
        </g>
      </g>
      <g transform="translate(250 24)">
        <path
          className="animate-pulse"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(500 150) scale(1.2)">
        <path
          className="animate-pulse animate-delay-200"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(205 120) scale(.7)">
        <path
          className="animate-pulse animate-delay-300"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(330 14) scale(.5)">
        <path
          className="animate-pulse animate-delay-100"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(300 190) scale(.6)">
        <path
          className="animate-pulse animate-delay-500"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
