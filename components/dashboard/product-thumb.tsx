import Image from "next/image";

import { getProductImageUrl } from "@/lib/demo/products/get-product-image";
import type { SellerCategoryId } from "@/types/seller";
import { cn } from "@/lib/utils";

type ProductThumbProps = {
  imageUrl?: string;
  categoryId?: SellerCategoryId;
  seed: string;
  alt: string;
  size?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
};

export function ProductThumb({
  imageUrl,
  categoryId = "fashion",
  seed,
  alt,
  size = 40,
  quality = 85,
  priority,
  className,
}: ProductThumbProps) {
  const src = imageUrl ?? getProductImageUrl(categoryId, seed);

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={quality}
      priority={priority}
      sizes={`${size}px`}
      className={cn("border border-[#e7e7e7] object-cover", className)}
    />
  );
}

type ProductImagePreviewProps = {
  imageUrl?: string;
  categoryId?: SellerCategoryId;
  seed: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
};

export function ProductImagePreview({
  imageUrl,
  categoryId = "fashion",
  seed,
  alt,
  width = 320,
  height = 320,
  quality = 95,
  priority,
  className,
}: ProductImagePreviewProps) {
  const src = imageUrl ?? getProductImageUrl(categoryId, seed);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 320px"
      className={cn("border border-[#e7e7e7] object-contain bg-white", className)}
    />
  );
}
