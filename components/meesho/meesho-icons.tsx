type IconProps = { size?: number; color?: string };

export function MsIconHome({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

export function MsIconChevronDown({ size = 14, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function MsIconChevronRight({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function MsIconBell({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M18 16H6l1.2-1.2A2 2 0 009 13.2V10a5 5 0 0110 0v3.2a2 2 0 001.2 1.8L21 16z" />
      <path d="M10 20a2 2 0 004 0" />
    </svg>
  );
}

export function MsIconHeadset({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4 12v4a2 2 0 002 2h1v-8H6a2 2 0 00-2 2zM20 12v4a2 2 0 01-2 2h-1v-8h1a2 2 0 012 2z" />
      <path d="M4 14h-.5M20 14h.5" />
    </svg>
  );
}

export function MsIconSearch({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function MsIconMenu({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function MsIconUpload({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 16V6M8 10l4-4 4 4" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function MsIconEdit({ size = 14, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 00-3-3L5 17v3z" />
    </svg>
  );
}

export function MsIconMore({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="18" r="1.5" />
    </svg>
  );
}

export function MsIconCheck({ size = 14, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function MsIconBox({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  );
}

export function MsIconUser({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

const NAV_ICON_MAP: Record<string, (p: IconProps) => React.ReactElement> = {
  home: MsIconHome,
  orders: MsIconBox,
  returns: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M6 8l6-4 6 4v8l-6 4-6-4V8z" />
    </svg>
  ),
  pricing: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  ),
  claims: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  ),
  inventory: MsIconBox,
  catalog: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M12 3v12M8 7l4-4 4 4" />
      <path d="M4 19h16" />
    </svg>
  ),
  "image-upload": ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="M20 16l-5-5-8 8" />
    </svg>
  ),
  quality: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M12 3l2.4 4.8 5.4.8-3.9 3.8.9 5.3L12 15.8 7.2 17.7l.9-5.3L4.2 8.6l5.4-.8L12 3z" />
    </svg>
  ),
  payments: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  warehouse: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M3 10l9-6 9 6v10H3V10z" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  influencer: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M4 14v4M8 10v8M12 6v12M16 10v8M20 14v4" />
    </svg>
  ),
  promotions: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M9 9l6 6M9.5 14.5l-1 3 3-1 6.5-6.5a2.1 2.1 0 00-3-3L9.5 14.5z" />
    </svg>
  ),
  cash: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8M9 10h4a2 2 0 010 4h-2" />
    </svg>
  ),
  dashboard: ({ size, color }) => (
    <svg width={size ?? 18} height={size ?? 18} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.8">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
    </svg>
  ),
};

export function MsNavIcon({ name, size = 18, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const Icon = NAV_ICON_MAP[name] ?? MsIconBox;
  return <Icon size={size} color={color} />;
}

export function MsLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div style={{ padding: collapsed ? "16px 8px" : "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <span style={{ fontSize: collapsed ? 11 : 15, fontWeight: 700, color: "var(--ms-sidebar-text-active)", letterSpacing: collapsed ? 0 : -0.3 }}>
        {collapsed ? "m" : "meesho"}
      </span>
      {!collapsed ? (
        <span style={{ display: "block", fontSize: 11, color: "var(--ms-sidebar-muted)", marginTop: 2 }}>
          Supplier Hub
        </span>
      ) : null}
    </div>
  );
}
