import { ProductDetails } from "@/components/product/ProductDetails";
import { getProductById } from "@/lib/shop-data";
import Link from "next/link";

export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Product not found</h1>
          <Link href="/dashboard/categories" className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/dashboard/categories" className="text-sm font-semibold text-slate-700 underline">← Back to categories</Link>
        </div>
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
