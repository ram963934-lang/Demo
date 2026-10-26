export const siteConfig = {
  name: "DropshipGuru Seller Central Demo",
  productName: "Seller Central Demo",
  description:
    "Production-quality demo platform recreating Amazon Seller Central for product demonstrations. All data is simulated.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  creator: "DropshipGuru",
} as const;

export type SiteConfig = typeof siteConfig;
