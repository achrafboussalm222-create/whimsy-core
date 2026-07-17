import { supabase } from "./supabase";
import { Product, ProductInput } from "./products";

const TABLE = "products";
const BUCKET = "product-images";

// ---------------------------------------------------------------------------
// Mapping between the database's snake_case columns and our camelCase types.
// ---------------------------------------------------------------------------

function rowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    details: row.details ?? [],
    images: row.images ?? [],
    createdAt: row.created_at,
  };
}

function inputToRow(input: ProductInput) {
  return {
    name: input.name,
    category: input.category,
    short_description: input.shortDescription,
    description: input.description,
    details: input.details,
    images: input.images,
  };
}

// ---------------------------------------------------------------------------
// Slugs
// ---------------------------------------------------------------------------

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const baseSlug = slugify(base) || "product";
  let candidate = baseSlug;
  let n = 2;
  // Keep trying candidate-2, candidate-3, ... until it's free.
  while (true) {
    let query = supabase.from(TABLE).select("id").eq("slug", candidate);
    if (ignoreId) query = query.neq("id", ignoreId);
    const { data, error } = await query.maybeSingle();
    if (error && error.code !== "PGRST116") throw error;
    if (!data) return candidate;
    candidate = `${baseSlug}-${n++}`;
  }
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from(TABLE).select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToProduct(data) : null;
}

/**
 * Subscribes to live inserts/updates/deletes so the site updates without a
 * refresh. Every caller gets its own uniquely-named channel — Supabase
 * doesn't allow two listeners sharing one channel name, and useProducts()
 * runs in several components at once (Collection, Instagram gallery, product
 * pages), so a shared name would crash after the first subscriber.
 */
export function subscribeToProducts(onChange: () => void) {
  const channelName = `products-changes-${Math.random().toString(36).slice(2)}`;
  const channel = supabase
    .channel(channelName)
    .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, () => onChange())
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ---------------------------------------------------------------------------
// Writes (require an authenticated admin session — enforced by RLS policies)
// ---------------------------------------------------------------------------

export async function createProduct(input: ProductInput): Promise<Product> {
  const slug = await uniqueSlug(input.name);
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ...inputToRow(input), slug })
    .select()
    .single();
  if (error) throw error;
  return rowToProduct(data);
}

export async function updateProduct(id: string, input: ProductInput, currentName: string): Promise<Product> {
  // Only regenerate the slug if the name actually changed, so existing links keep working.
  const row: Record<string, unknown> = inputToRow(input);
  if (input.name !== currentName) {
    row.slug = await uniqueSlug(input.name, id);
  }
  const { data, error } = await supabase.from(TABLE).update(row).eq("id", id).select().single();
  if (error) throw error;
  return rowToProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Image uploads
// ---------------------------------------------------------------------------

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
