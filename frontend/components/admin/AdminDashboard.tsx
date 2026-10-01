import Link from "next/link";

export function AdminDashboard() {
  const stats = [
    { label: "Total users", value: "1.2k" },
    { label: "Products", value: "128" },
    { label: "Orders", value: "94" },
    { label: "Revenue", value: "$41.8k" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Link href="/admin/products" className="rounded-[1.5rem] bg-slate-900 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Products</p>
          <p className="mt-3 text-2xl font-black">Manage catalog</p>
        </Link>
        <Link href="/admin/categories" className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Categories</p>
          <p className="mt-3 text-2xl font-black text-slate-900">Organize store</p>
        </Link>
        <Link href="/admin/orders" className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Orders</p>
          <p className="mt-3 text-2xl font-black text-slate-900">Track fulfillment</p>
        </Link>
      </div>
    </div>
  );
}
