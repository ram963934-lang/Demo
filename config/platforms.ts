export const PLATFORMS = [
  {
    id: "amazon",
    name: "🟠 Amazon Seller Central",
    description:
      "Full-fidelity Amazon Seller Central India demo with dashboard, inventory, orders, and real product catalog.",
    href: "/amazon",
    accent: "#FF9900",
    accentHover: "#E88B00",
    glow: "rgba(255, 153, 0, 0.35)",
    gradientFrom: "rgba(255, 153, 0, 0.18)",
    gradientTo: "rgba(255, 153, 0, 0.02)",
    badge: "Live Demo",
  },
  {
    id: "meesho",
    name: "🟣 Meesho Supplier Panel",
    description:
      "Supplier-first marketplace workflow for catalog uploads, order fulfillment, and payout tracking.",
    href: "/meesho",
    accent: "#9B59B6",
    accentHover: "#8E44AD",
    glow: "rgba(155, 89, 182, 0.35)",
    gradientFrom: "rgba(155, 89, 182, 0.18)",
    gradientTo: "rgba(155, 89, 182, 0.02)",
    badge: "Live Demo",
  },
  {
    id: "flipkart",
    name: "🔵 Flipkart Seller Hub",
    description:
      "Enterprise seller hub experience for listings, growth analytics, and fulfillment operations.",
    href: "/flipkart",
    accent: "#2874F0",
    accentHover: "#1A5FCC",
    glow: "rgba(40, 116, 240, 0.35)",
    gradientFrom: "rgba(40, 116, 240, 0.18)",
    gradientTo: "rgba(40, 116, 240, 0.02)",
    badge: "Live Demo",
  },
] as const;

export type PlatformId = (typeof PLATFORMS)[number]["id"];
