import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, X, Loader2, ImagePlus } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { categories, Category, ProductInput } from "../../lib/products";
import { createProduct, updateProduct, uploadProductImage, fetchProductById } from "../../lib/api";

const emptyForm: ProductInput = {
  name: "",
  category: "Bouquets",
  shortDescription: "",
  description: "",
  details: [""],
  images: [],
};

export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [originalName, setOriginalName] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then((product) => {
        if (!product) {
          setError("Product not found.");
          return;
        }
        setForm({
          name: product.name,
          category: product.category,
          shortDescription: product.shortDescription,
          description: product.description,
          details: product.details.length ? product.details : [""],
          images: product.images,
        });
        setOriginalName(product.name);
      })
      .catch((err) => setError(err?.message ?? "Couldn't load this product."))
      .finally(() => setLoading(false));
  }, [id]);

  const update = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded = await Promise.all(Array.from(files).map(uploadProductImage));
      update("images", [...form.images, ...uploaded]);
    } catch (err: any) {
      setError(err?.message ?? "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => update("images", form.images.filter((_, idx) => idx !== i));

  const updateDetail = (i: number, value: string) =>
    update("details", form.details.map((d, idx) => (idx === i ? value : d)));
  const addDetail = () => update("details", [...form.details, ""]);
  const removeDetail = (i: number) => update("details", form.details.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.images.length === 0) {
      setError("Add at least one photo before saving.");
      return;
    }

    const cleanForm: ProductInput = { ...form, details: form.details.map((d) => d.trim()).filter(Boolean) };

    setSaving(true);
    try {
      if (isEditing && id) {
        await updateProduct(id, cleanForm, originalName);
      } else {
        await createProduct(cleanForm);
      }
      navigate("/admin");
    } catch (err: any) {
      setError(err?.message ?? "Couldn't save this product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-brown/50 text-sm">Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-brown mb-8">{isEditing ? "Edit Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7 max-w-2xl">
        {error && <p className="text-sm text-red-700 bg-red-50 rounded-lg px-4 py-3">{error}</p>}

        <Field label="Product Name">
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="e.g. Crochet Tulip Bouquet"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value as Category)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Short Description" hint="Shown on the product card in the collection grid.">
          <input
            required
            value={form.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            className={inputClass}
            placeholder="One sentence that sells it"
          />
        </Field>

        <Field label="Full Description" hint="Shown on the product's own page.">
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Details" hint="Small bullet points — size, materials, turnaround time, etc.">
          <div className="flex flex-col gap-2">
            {form.details.map((d, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={d}
                  onChange={(e) => updateDetail(i, e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Approx. 30cm tall"
                />
                <button
                  type="button"
                  onClick={() => removeDetail(i)}
                  className="text-brown/40 hover:text-red-700 transition-colors px-2"
                  aria-label="Remove detail"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDetail}
              className="self-start inline-flex items-center gap-1.5 text-sm text-olive hover:underline underline-offset-4"
            >
              <Plus size={14} /> Add detail
            </button>
          </div>
        </Field>

        <Field label="Photos" hint="Upload one or more — the first is used as the main image.">
          <div className="flex flex-wrap gap-3 mb-3">
            {form.images.map((src, i) => (
              <div key={src} className="relative w-24 h-24 rounded-lg overflow-hidden group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute inset-0 bg-brown/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cream"
                  aria-label="Remove photo"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-brown/20 flex flex-col items-center justify-center gap-1 text-brown/40 hover:border-gold hover:text-gold cursor-pointer transition-colors">
              {uploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
              <span className="text-[10px]">{uploading ? "Uploading…" : "Add photo"}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
                disabled={uploading}
              />
            </label>
          </div>
        </Field>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-olive text-cream rounded-full px-7 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60 disabled:pointer-events-none"
          >
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="text-brown/60 hover:text-brown px-4 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

const inputClass =
  "w-full bg-cream border border-brown/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brown mb-1">{label}</label>
      {hint && <p className="text-xs text-brown/45 mb-2">{hint}</p>}
      {children}
    </div>
  );
}
