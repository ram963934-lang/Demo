type IconProps = { size?: number; color?: string };

export function FkIconMenu({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function FkIconSearch({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function FkIconChevronRight({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2">
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function FkIconBell({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M18 16H6l1.2-1.2A2 2 0 009 13.2V10a5 5 0 0110 0v3.2a2 2 0 001.2 1.8L21 16z" />
      <path d="M10 20a2 2 0 004 0" />
    </svg>
  );
}

const NAV: Record<string, (p: IconProps) => React.ReactElement> = {
  dashboard: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
    </svg>
  ),
  orders: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M6 8l6-4 6 4v8l-6 4-6-4V8z" />
    </svg>
  ),
  listings: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  ),
  inventory: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    </svg>
  ),
  returns: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M3 12a9 9 0 0115-6M21 12a9 9 0 01-15 6" /><path d="M3 7v5h5M21 17v-5h-5" />
    </svg>
  ),
  performance: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M4 19V5M4 19h16M8 17V9M12 17V7M16 17v-4" />
    </svg>
  ),
  ads: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
    </svg>
  ),
  reports: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 10h8M8 14h5" />
    </svg>
  ),
  payments: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" />
    </svg>
  ),
  settings: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  ),
};

export function FkNavIcon({ name, size = 18, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const Icon = NAV[name] ?? NAV.dashboard;
  return <Icon size={size} color={color} />;
}

export function FkLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div style={{ padding: collapsed ? "16px 8px" : "16px 20px", borderTop: "1px solid var(--fk-border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 28, height: 28, borderRadius: 4, background: "var(--fk-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "var(--fk-yellow)" }}>F</span>
        {!collapsed ? (
          <div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--fk-text)" }}>Seller Hub</span>
            <span style={{ display: "block", fontSize: 11, color: "var(--fk-text-muted)" }}>Flipkart</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
