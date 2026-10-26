import { PRODUCT_IMAGE_FOLDERS, type ProductImageFolder } from "@/lib/demo/products/image-manifest";
import type { SellerCategoryId } from "@/types/seller";

/** Maps seller categories to folders under public/products */
const CATEGORY_FOLDERS: Record<SellerCategoryId, readonly ProductImageFolder[]> = {
  "home-decor": ["home decor"],
  fashion: ["Hand Bag", "Bag Pack"],
  jewellery: ["Jewellery"],
  beauty: ["Jewellery"],
  kitchen: ["home decor"],
  electronics: ["Bag Pack"],
  toys: ["Bag Pack", "Hand Bag"],
  sports: ["Bag Pack"],
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function encodeProductPublicPath(folder: string, filename: string): string {
  return `/products/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
}

function getImagesForCategory(categoryId: SellerCategoryId): string[] {
  const folderNames = CATEGORY_FOLDERS[categoryId] ?? [];
  const paths: string[] = [];

  for (const folder of folderNames) {
    const files = PRODUCT_IMAGE_FOLDERS[folder];
    if (!files) continue;
    for (const file of files) {
      paths.push(encodeProductPublicPath(folder, file));
    }
  }

  return paths;
}

/** Deterministic image per product key — stable across renders, varied within category */
export function getProductImageUrl(categoryId: SellerCategoryId, productKey: string): string {
  const images = getImagesForCategory(categoryId);
  if (images.length === 0) {
    const fallback = Object.entries(PRODUCT_IMAGE_FOLDERS)[0];
    if (!fallback) return "/products";
    const [folder, files] = fallback;
    return encodeProductPublicPath(folder, files[0]);
  }

  const index = hashString(`${categoryId}:${productKey}`) % images.length;
  return images[index];
}

export function getCategoryProductImages(categoryId: SellerCategoryId): readonly string[] {
  return getImagesForCategory(categoryId);
}
