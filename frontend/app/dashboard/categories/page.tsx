"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, products } from "@/lib/shop-data";

export default function CategoriesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const visibleProducts = useMemo(() => {
    if (selectedCategoryId === "all") return products;
    return products.filter((product) => product.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Categories</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Browse by collection</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategoryId("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                selectedCategoryId === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategoryId(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  selectedCategoryId === category.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategoryId(category.id)}
              className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img src={category.image} alt={category.name} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <ProductGrid products={visibleProducts} />
        </div>
      </div>
    </div>
  );
}
