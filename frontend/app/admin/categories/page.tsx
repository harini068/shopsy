import { categories } from "@/lib/shop-data";

export default function AdminCategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Categories</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Manage categories</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
              <img src={category.image} alt={category.name} className="h-40 w-full object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                <button type="button" className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Edit category</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
