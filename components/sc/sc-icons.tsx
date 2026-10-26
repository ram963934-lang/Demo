export function IconMenu() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="white" aria-hidden="true">
      <rect y="0" width="18" height="2" rx="0.5" />
      <rect y="6" width="18" height="2" rx="0.5" />
      <rect y="12" width="18" height="2" rx="0.5" />
    </svg>
  );
}

export function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="1" y="2" width="16" height="10" rx="1" />
      <path d="M1 3.5l8 5 8-5" />
    </svg>
  );
}

export function IconGear() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="2.5" />
      <path d="M8.5 1.5v2M8.5 13v2M1.5 8.5h2M13 8.5h2M3.4 3.4l1.4 1.4M12.2 12.2l1.4 1.4M3.4 13.6l1.4-1.4M12.2 4.8l1.4-1.4" />
    </svg>
  );
}

export function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13M8 1.8c2 2.2 2 10.2 0 12.4M8 1.8c-2 2.2-2 10.2 0 12.4" />
    </svg>
  );
}

export function IconChevronDown({ size = 12, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color} aria-hidden="true">
      <path d="M2.5 4.5L6 8l3.5-3.5H2.5z" />
    </svg>
  );
}

export function IconChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="white" aria-hidden="true">
      <path d="M4 2l4 4-4 4V2z" />
    </svg>
  );
}

export function IconHome() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="#565959" aria-hidden="true">
      <path d="M8 1.2L1.5 7v7.8h4.8V10h3.4v4.8H14.5V7L8 1.2zm0 2l4.8 4.3V13.3h-1.8V9.2H5V13.3H3.2V7.5L8 3.2z" />
    </svg>
  );
}

export function IconPencil() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.4" aria-hidden="true">
      <path d="M11.2 1.8l3 3-9.7 9.7H2v-3.7L11.2 1.8z" />
    </svg>
  );
}

export function IconInfo() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#879596" aria-hidden="true">
      <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 1.2a5.3 5.3 0 110 10.6A5.3 5.3 0 018 2.7zm-.7 3.6h1.4v1.2H7.3V6.3zm0 2.4h1.4V12H7.3V8.7z" />
    </svg>
  );
}

export function IconKebab() {
  return (
    <svg width="4" height="14" viewBox="0 0 4 14" fill="#565959" aria-hidden="true">
      <circle cx="2" cy="2" r="1.4" />
      <circle cx="2" cy="7" r="1.4" />
      <circle cx="2" cy="12" r="1.4" />
    </svg>
  );
}

export function IconStarOutline() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#879596" strokeWidth="1.3" aria-hidden="true">
      <path d="M8 1.5l1.8 4.2 4.5.3-3.4 3 1.1 4.4L8 11.8 3.9 13.4l1.1-4.4-3.4-3 4.5-.3L8 1.5z" />
    </svg>
  );
}

export function IconStarFilled({ partial = false }: { partial?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#ff9900" />
          <stop offset="50%" stopColor="#d5d9d9" />
        </linearGradient>
      </defs>
      <path
        d="M8 1.5l1.8 4.2 4.5.3-3.4 3 1.1 4.4L8 11.8 3.9 13.4l1.1-4.4-3.4-3 4.5-.3L8 1.5z"
        fill={partial ? "url(#half)" : "#ff9900"}
      />
    </svg>
  );
}

export function IconSort() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="#879596" aria-hidden="true">
      <path d="M5 0l3 3.5H2L5 0zm0 12L2 8.5h6L5 12z" />
    </svg>
  );
}

export function IconEye() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.2" aria-hidden="true">
      <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
      <circle cx="8" cy="8" r="1.8" />
    </svg>
  );
}

export function IconComment() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.2" aria-hidden="true">
      <path d="M2 3.5h12v7H9l-3 2.5V10.5H2V3.5z" />
    </svg>
  );
}

export function IconBookmark() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="#879596" strokeWidth="1.2" aria-hidden="true">
      <path d="M2 1h8v12l-4-3-4 3V1z" />
    </svg>
  );
}

export function IconEnvelopeSmall() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.3" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1" />
      <path d="M1.5 4.5L8 9.5l6.5-5" />
    </svg>
  );
}

export function IconExpand() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.4" aria-hidden="true">
      <path d="M5 2.5v3H2M11 13.5v-3h3M3.5 11A5 5 0 0112 5.5M12.5 5A5 5 0 014 10.5" />
    </svg>
  );
}

export function IconForumDoc() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#565959" aria-hidden="true">
      <path d="M3 2h7l3 3v9H3V2zm6 0v3h3" opacity="0.9" />
    </svg>
  );
}
