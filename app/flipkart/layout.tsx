import "@/styles/themes/flipkart.css";

import { FkShell } from "@/components/flipkart/fk-shell";

export default function FlipkartLayout({ children }: { children: React.ReactNode }) {
  return <FkShell>{children}</FkShell>;
}
