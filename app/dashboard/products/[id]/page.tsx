import { ProductDetailContent } from "@/components/products/product-detail-content";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  return <ProductDetailContent productId={id} />;
}
