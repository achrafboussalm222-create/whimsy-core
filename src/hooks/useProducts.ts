import { useCallback, useEffect, useState } from "react";
import { fetchProducts, subscribeToProducts } from "../lib/api";
import { Product } from "../lib/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong loading products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Re-fetch automatically whenever a product is added, edited, or deleted —
    // this is what makes admin changes show up on the live site immediately.
    const unsubscribe = subscribeToProducts(load);
    return unsubscribe;
  }, [load]);

  return { products, loading, error, refetch: load };
}
