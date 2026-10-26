import { FlipkartOrderDetailPage } from "@/components/flipkart/pages/flipkart-order-detail-page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FlipkartOrderDetailPage orderId={id} />;
}
