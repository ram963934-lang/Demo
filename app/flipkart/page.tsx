import { redirect } from "next/navigation";

import { flipkartRoutes } from "@/config/flipkart-routes";

export default function FlipkartRootPage() {
  redirect(flipkartRoutes.dashboard);
}
