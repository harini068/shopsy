import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/shop-data";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
