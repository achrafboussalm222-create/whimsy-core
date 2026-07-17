import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useProducts } from "../../hooks/useProducts";
import { deleteProduct } from "../../lib/api";

export default function AdminDashboard() {
  const { products, loading, error, refetch } = useProducts();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      refetch();
    } catch (err: any) {
      alert(err?.message ?? "Couldn't delete this product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-brown">Products</h1>
          <p className="text-brown/50 text-sm mt-1">{products.length} total — changes appear on the live site instantly.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-olive text-cream rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {loading && <p className="text-brown/50 text-sm">Loading products…</p>}
      {error && <p className="text-red-700 bg-red-50 rounded-lg px-4 py-3 text-sm">{error}</p>}

      {!loading && products.length === 0 && !error && (
        <div className="text-center py-20 bg-cream rounded-2xl">
          <p className="font-display italic text-brown/50 text-xl mb-4">No products yet.</p>
          <Link to="/admin/products/new" className="text-olive underline underline-offset-4 text-sm">
            Add your first one
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div key={p.id} className="bg-cream rounded-xl p-4 flex items-center gap-4 shadow-soft">
            <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover shrink-0 bg-cream-soft" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-brown truncate">{p.name}</p>
              <p className="text-xs text-brown/50 uppercase tracking-wide">{p.category}</p>
            </div>
            <Link
              to={`/admin/products/${p.id}/edit`}
              className="p-2.5 rounded-lg text-olive hover:bg-olive/10 transition-colors"
              aria-label={`Edit ${p.name}`}
            >
              <Pencil size={17} />
            </Link>
            <button
              onClick={() => handleDelete(p.id, p.name)}
              disabled={deletingId === p.id}
              className="p-2.5 rounded-lg text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
              aria-label={`Delete ${p.name}`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
