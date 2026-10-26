export function ScLogo() {
  return (
    <div style={{ flexShrink: 0, lineHeight: 1, userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              textTransform: "lowercase",
            }}
          >
            amazon
          </span>
          <svg
            style={{ position: "absolute", left: 1, bottom: -2 }}
            width="50"
            height="7"
            viewBox="0 0 50 7"
            aria-hidden="true"
          >
            <path
              d="M1 4.5C11 1 21 0.5 48 2"
              fill="none"
              stroke="#ff9900"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M46 2l4-1.5-2 4" fill="#ff9900" />
          </svg>
        </div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.95)", lineHeight: 1.15, paddingBottom: 1 }}>
          seller
          <br />
          central
        </span>
      </div>
      <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.72)", marginTop: 2 }}>
        India
      </span>
    </div>
  );
}
