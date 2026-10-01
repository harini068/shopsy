"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/lib/shop-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return products;

    return products.filter((product) => {
      const searchableText = [product.name, product.description].join(" ").toLowerCase();
      return searchableText.includes(normalized) || product.categoryId.toLowerCase().includes(normalized);
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Search</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Find the right product</h1>

          <div className="mt-6 flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-xl">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product name or category"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-8">
          {query && !results.length ? (
            <div className="rounded-[1.5rem] bg-white p-10 text-center text-slate-600 ring-1 ring-slate-200">
              No products match your search. Try another keyword.
            </div>
          ) : (
            <ProductGrid products={results} />
          )}
        </div>
      </div>
    </div>
  );
}
