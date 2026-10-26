import "@/styles/themes/meesho.css";

import { MeeshoShell } from "@/components/meesho/meesho-shell";

export default function MeeshoLayout({ children }: { children: React.ReactNode }) {
  return <MeeshoShell>{children}</MeeshoShell>;
}
