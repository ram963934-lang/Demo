import { ScShell } from "@/components/sc/sc-shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ScShell>{children}</ScShell>;
}
