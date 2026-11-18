/** Decorative header art: receipt, card, coins and sparkles. Theme-aware, purely visual. */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 230"
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden w-[620px] xl:block"
    >
      <defs>
        <linearGradient id="hCard" x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            style={{
              stopColor: "color-mix(in oklab,var(--primary) 70%,#0b3a4a)",
            }}
          />
          <stop
            offset="1"
            style={{
              stopColor: "color-mix(in oklab,var(--primary) 35%,#021a24)",
            }}
          />
        </linearGradient>
        <linearGradient id="hPaper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "#ffffff" }} />
          <stop offset="1" style={{ stopColor: "#d4f1f6" }} />
        </linearGradient>
        <linearGradient id="hCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "#fde68a" }} />
          <stop offset=".55" style={{ stopColor: "#f59e0b" }} />
          <stop offset="1" style={{ stopColor: "#b45309" }} />
        </linearGradient>
        <linearGradient id="hSwoosh" x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: "0" }}
          />
          <stop
            offset=".6"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: ".3" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--primary)", stopOpacity: ".25" }}
          />
        </linearGradient>
        <linearGradient id="hFadeY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="hMask">
          <rect width="520" height="230" fill="url(#hFadeY)" />
        </mask>
      </defs>
      <path
        mask="url(#hMask)"
        d="M0 190 C90 100 190 230 300 140 S470 20 520 70 V230 H0Z"
        fill="url(#hSwoosh)"
      />
      <path
        mask="url(#hMask)"
        d="M0 205 C110 135 200 240 310 160 S470 70 520 110"
        fill="none"
        stroke="url(#hSwoosh)"
        strokeWidth="3"
      />
      <g
        className="animate-float animate-delay-200"
        style={{ animationDuration: "7s" }}
      >
        <g
          transform="translate(300 42) rotate(16)"
          style={{ filter: "drop-shadow(0 18px 20px rgba(0,40,60,.35))" }}
        >
          <rect
            width="180"
            height="116"
            rx="16"
            fill="url(#hCard)"
            stroke="#ffffff"
            strokeOpacity=".25"
          />
          <rect
            x="16"
            y="26"
            width="58"
            height="12"
            rx="6"
            fill="#ffffff"
            fillOpacity=".4"
          />
          <rect
            x="16"
            y="48"
            width="92"
            height="8"
            rx="4"
            fill="#ffffff"
            fillOpacity=".22"
          />
          <rect
            x="16"
            y="88"
            width="52"
            height="8"
            rx="4"
            fill="#ffffff"
            fillOpacity=".22"
          />
          <rect
            x="116"
            y="68"
            width="48"
            height="32"
            rx="8"
            style={{ fill: "var(--primary-glow)" }}
            fillOpacity=".9"
          />
          <rect
            x="124"
            y="76"
            width="14"
            height="16"
            rx="3"
            fill="#ffffff"
            fillOpacity=".5"
          />
        </g>
      </g>
      <g className="animate-float" style={{ animationDuration: "6s" }}>
        <g
          transform="translate(185 8) rotate(-10)"
          style={{ filter: "drop-shadow(0 16px 18px rgba(0,40,60,.3))" }}
        >
          <path
            d="M0 0 H112 V152 L98 142 L84 152 L70 142 L56 152 L42 142 L28 152 L14 142 L0 152 Z"
            fill="url(#hPaper)"
            style={{ stroke: "var(--primary)" }}
            strokeOpacity=".3"
          />
          <rect
            x="16"
            y="20"
            width="50"
            height="10"
            rx="5"
            style={{ fill: "var(--primary)" }}
            fillOpacity=".7"
          />
          <rect
            x="16"
            y="42"
            width="80"
            height="7"
            rx="3.5"
            style={{ fill: "var(--primary)" }}
            fillOpacity=".28"
          />
          <rect
            x="16"
            y="58"
            width="64"
            height="7"
            rx="3.5"
            style={{ fill: "var(--primary)" }}
            fillOpacity=".28"
          />
          <rect
            x="16"
            y="74"
            width="72"
            height="7"
            rx="3.5"
            style={{ fill: "var(--primary)" }}
            fillOpacity=".28"
          />
          <rect
            x="16"
            y="90"
            width="48"
            height="7"
            rx="3.5"
            style={{ fill: "var(--primary)" }}
            fillOpacity=".28"
          />
          <rect
            x="16"
            y="114"
            width="44"
            height="12"
            rx="6"
            style={{ fill: "var(--primary)" }}
            fillOpacity=".55"
          />
        </g>
      </g>
      <g
        className="animate-float animate-delay-300"
        style={{ animationDuration: "5s" }}
      >
        <g
          transform="translate(200 150)"
          style={{ filter: "drop-shadow(0 14px 14px rgba(120,53,15,.4))" }}
        >
          <circle r="46" fill="url(#hCoin)" />
          <circle
            r="36"
            fill="none"
            stroke="#fff7d6"
            strokeOpacity=".6"
            strokeWidth="3"
          />
          <text
            y="15"
            textAnchor="middle"
            fontSize="46"
            fontWeight="800"
            fill="#fff8e1"
          >
            $
          </text>
          <ellipse
            cx="-16"
            cy="-24"
            rx="14"
            ry="6"
            fill="#ffffff"
            fillOpacity=".45"
            transform="rotate(-30)"
          />
        </g>
      </g>
      <g
        className="animate-float animate-delay-100"
        style={{ animationDuration: "6.5s" }}
      >
        <g
          transform="translate(110 178)"
          style={{ filter: "drop-shadow(0 10px 10px rgba(120,53,15,.35))" }}
        >
          <circle r="26" fill="url(#hCoin)" />
          <circle
            r="20"
            fill="none"
            stroke="#fff7d6"
            strokeOpacity=".6"
            strokeWidth="2"
          />
          <text
            y="9"
            textAnchor="middle"
            fontSize="26"
            fontWeight="800"
            fill="#fff8e1"
          >
            $
          </text>
        </g>
      </g>
      <g
        className="animate-float animate-delay-500"
        style={{ animationDuration: "5.5s" }}
      >
        <g transform="translate(62 118)">
          <circle r="15" fill="url(#hCoin)" />
          <circle
            r="10"
            fill="none"
            stroke="#fff7d6"
            strokeOpacity=".6"
            strokeWidth="2"
          />
        </g>
      </g>
      <g transform="translate(150 30)">
        <path
          className="animate-pulse"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#ffffff"
        />
      </g>
      <g transform="translate(478 130) scale(1.3)">
        <path
          className="animate-pulse animate-delay-200"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#ffffff"
        />
      </g>
      <g transform="translate(40 76) scale(.6)">
        <path
          className="animate-pulse animate-delay-300"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(500 44) scale(.7)">
        <path
          className="animate-pulse animate-delay-100"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(330 14) scale(.5)">
        <path
          className="animate-pulse animate-delay-500"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}
