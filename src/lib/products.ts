// Shared types for the product catalog. The actual product data now lives in
// your Supabase database (table: "products") — see supabase/schema.sql and
// src/lib/api.ts for the read/write layer.

export type Category = "Bouquets" | "Plushies" | "Keychains" | "Gifts";

export const categories: Category[] = ["Bouquets", "Plushies", "Keychains", "Gifts"];

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  details: string[];
  images: string[];
  createdAt?: string;
}

/** Fields the admin form edits — everything except server-generated ids/slugs. */
export interface ProductInput {
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  details: string[];
  images: string[];
}

/** Same category first, then anything else, excluding the product itself. */
export function getRelatedProducts(allProducts: Product[], product: Product, count = 3): Product[] {
  return allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(allProducts.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);
}
