type ScSparklineProps = {
  data: number[];
};

export function ScSparkline({ data }: ScSparklineProps) {
  const w = 96;
  const h = 26;
  const pad = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return { x, y };
  });

  const last = pts[pts.length - 1];

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: "block", marginTop: 8 }}>
      <polyline
        fill="none"
        stroke="#0f1111"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
      />
      {last ? <circle cx={last.x} cy={last.y} r="2.5" fill="#0f1111" /> : null}
    </svg>
  );
}
