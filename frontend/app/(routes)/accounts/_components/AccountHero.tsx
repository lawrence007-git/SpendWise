/**
 * Decorative header art for the Accounts page: wallet, cards, coin stack and a shield badge.
 * Positions itself against the page wrapper (top-right), so render it inside a header
 * that has no transform of its own.
 */
export function AccountHero() {
  return (
    <svg
      viewBox="0 0 520 230"
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden w-[620px] xl:block"
    >
      <defs>
        <linearGradient id="aWallet" x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            style={{
              stopColor: "color-mix(in oklab,var(--primary) 75%,#0b3a4a)",
            }}
          />
          <stop
            offset="1"
            style={{
              stopColor: "color-mix(in oklab,var(--primary) 38%,#021a24)",
            }}
          />
        </linearGradient>
        <linearGradient id="aCardTeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--primary-glow)" }} />
          <stop offset="1" style={{ stopColor: "var(--primary)" }} />
        </linearGradient>
        <linearGradient id="aCardAmber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "#fde68a" }} />
          <stop offset="1" style={{ stopColor: "#f97316" }} />
        </linearGradient>
        <linearGradient id="aCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "#fde68a" }} />
          <stop offset=".6" style={{ stopColor: "#f59e0b" }} />
          <stop offset="1" style={{ stopColor: "#d97706" }} />
        </linearGradient>
        <linearGradient id="aShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--primary-glow)" }} />
          <stop offset="1" style={{ stopColor: "var(--success)" }} />
        </linearGradient>
        <linearGradient id="aSwoosh" x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--primary)", stopOpacity: "0" }}
          />
          <stop
            offset=".5"
            style={{ stopColor: "var(--primary-glow)", stopOpacity: ".28" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--primary)", stopOpacity: ".25" }}
          />
        </linearGradient>
        <linearGradient id="aFadeY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="aMask">
          <rect width="520" height="230" fill="url(#aFadeY)" />
        </mask>
      </defs>
      <path
        mask="url(#aMask)"
        d="M0 205 C120 150 210 220 320 150 S470 55 520 95 V230 H0Z"
        fill="url(#aSwoosh)"
      />
      <path
        mask="url(#aMask)"
        d="M0 180 C110 120 220 190 330 120 S470 30 520 60"
        fill="none"
        stroke="url(#aSwoosh)"
        strokeWidth="3"
      />
      <g
        className="animate-float animate-delay-200"
        style={{ animationDuration: "7s" }}
      >
        <g
          transform="translate(272 36) rotate(-10)"
          style={{ filter: "drop-shadow(0 12px 14px rgba(0,40,60,.3))" }}
        >
          <rect
            width="124"
            height="78"
            rx="11"
            fill="url(#aCardAmber)"
            stroke="#fff"
            strokeOpacity=".4"
          />
          <rect
            x="12"
            y="14"
            width="34"
            height="9"
            rx="4.5"
            fill="#fff"
            fillOpacity=".6"
          />
          <rect
            x="12"
            y="58"
            width="56"
            height="6"
            rx="3"
            fill="#fff"
            fillOpacity=".4"
          />
        </g>
      </g>
      <g
        className="animate-float animate-delay-100"
        style={{ animationDuration: "5.5s" }}
      >
        <g
          transform="translate(338 28) rotate(9)"
          style={{ filter: "drop-shadow(0 12px 14px rgba(0,40,60,.3))" }}
        >
          <rect
            width="124"
            height="78"
            rx="11"
            fill="url(#aCardTeal)"
            stroke="#fff"
            strokeOpacity=".4"
          />
          <rect
            x="12"
            y="14"
            width="34"
            height="9"
            rx="4.5"
            fill="#fff"
            fillOpacity=".6"
          />
          <circle cx="102" cy="58" r="9" fill="#fff" fillOpacity=".35" />
          <circle cx="92" cy="58" r="9" fill="#fff" fillOpacity=".35" />
        </g>
      </g>
      <g className="animate-float" style={{ animationDuration: "6s" }}>
        <g
          transform="translate(250 60)"
          style={{ filter: "drop-shadow(0 18px 20px rgba(0,40,60,.38))" }}
        >
          <rect
            y="20"
            width="190"
            height="100"
            rx="22"
            fill="url(#aWallet)"
            stroke="#fff"
            strokeOpacity=".22"
          />
          <path
            d="M0 42 C0 30 10 20 22 20 H168 C180 20 190 30 190 42 V56 H0 Z"
            fill="#fff"
            fillOpacity=".14"
          />
          <rect
            x="8"
            y="28"
            width="174"
            height="84"
            rx="16"
            fill="none"
            stroke="#fff"
            strokeOpacity=".28"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <rect
            x="140"
            y="52"
            width="60"
            height="40"
            rx="14"
            style={{ fill: "color-mix(in oklab,var(--primary) 30%,#021a24)" }}
            stroke="#fff"
            strokeOpacity=".25"
          />
          <circle
            cx="166"
            cy="72"
            r="7"
            style={{ fill: "var(--primary-glow)" }}
          />
        </g>
      </g>
      <g
        className="animate-float animate-delay-300"
        style={{ animationDuration: "5s" }}
      >
        <g
          transform="translate(150 178)"
          style={{ filter: "drop-shadow(0 12px 12px rgba(120,53,15,.4))" }}
        >
          <g transform="translate(0 0)">
            <rect x="-34" y="0" width="68" height="14" fill="#c2670a" />
            <ellipse cy="14" rx="34" ry="10" fill="#c2670a" />
            <ellipse rx="34" ry="10" fill="url(#aCoin)" />
            <ellipse
              rx="25"
              ry="6.5"
              fill="none"
              stroke="#fff7d6"
              strokeOpacity=".55"
              strokeWidth="2"
            />
          </g>
          <g transform="translate(0 -16)">
            <rect x="-34" y="0" width="68" height="14" fill="#c2670a" />
            <ellipse cy="14" rx="34" ry="10" fill="#c2670a" />
            <ellipse rx="34" ry="10" fill="url(#aCoin)" />
            <ellipse
              rx="25"
              ry="6.5"
              fill="none"
              stroke="#fff7d6"
              strokeOpacity=".55"
              strokeWidth="2"
            />
          </g>
          <g transform="translate(0 -32)">
            <rect x="-34" y="0" width="68" height="14" fill="#c2670a" />
            <ellipse cy="14" rx="34" ry="10" fill="#c2670a" />
            <ellipse rx="34" ry="10" fill="url(#aCoin)" />
            <ellipse
              rx="25"
              ry="6.5"
              fill="none"
              stroke="#fff7d6"
              strokeOpacity=".55"
              strokeWidth="2"
            />
          </g>
          <g transform="translate(0 -48)">
            <rect x="-34" y="0" width="68" height="14" fill="#c2670a" />
            <ellipse cy="14" rx="34" ry="10" fill="#c2670a" />
            <ellipse rx="34" ry="10" fill="url(#aCoin)" />
            <ellipse
              rx="25"
              ry="6.5"
              fill="none"
              stroke="#fff7d6"
              strokeOpacity=".55"
              strokeWidth="2"
            />
          </g>
        </g>
      </g>
      <g
        className="animate-float animate-delay-500"
        style={{ animationDuration: "6.5s" }}
      >
        <g
          transform="translate(486 150)"
          style={{ filter: "drop-shadow(0 10px 12px rgba(0,40,60,.3))" }}
        >
          <path
            d="M0 -26 L22 -17 V4 C22 17 11 25 0 30 C-11 25 -22 17 -22 4 V-17 Z"
            fill="url(#aShield)"
            stroke="#fff"
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <path
            d="M-9 2 L-2 9 L10 -6"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g transform="translate(200 26)">
        <path
          className="animate-pulse"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(500 40) scale(1.2)">
        <path
          className="animate-pulse animate-delay-200"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
      <g transform="translate(70 90) scale(.6)">
        <path
          className="animate-pulse animate-delay-300"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(372 10) scale(.5)">
        <path
          className="animate-pulse animate-delay-100"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          style={{ fill: "var(--primary-glow)" }}
        />
      </g>
      <g transform="translate(110 150) scale(.7)">
        <path
          className="animate-pulse animate-delay-500"
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
