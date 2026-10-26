import { redirect } from "next/navigation";

import { meeshoRoutes } from "@/config/meesho-routes";

export default function MeeshoRootPage() {
  redirect(meeshoRoutes.dashboard);
}
