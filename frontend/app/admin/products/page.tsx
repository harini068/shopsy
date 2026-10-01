import { categories, products } from "@/lib/shop-data";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Products</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Manage products</h1>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center">
              <img src={product.images[0]} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-900">{product.name}</p>
                <p className="text-sm text-slate-600">{categories.find((category) => category.id === product.categoryId)?.name ?? "Uncategorized"}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Stock: {product.stock}</span>
                <button type="button" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
