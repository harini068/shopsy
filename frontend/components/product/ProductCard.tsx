import Link from "next/link";
import { addToCart } from "@/lib/storage";
import { formatPrice, type Product } from "@/lib/shop-data";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/dashboard/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {product.discountPrice < product.price && (
            <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/dashboard/products/${product.id}`}>
          <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        </Link>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <span>★ {product.rating}</span>
          <span>•</span>
          <span>{product.reviewCount} reviews</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900">{formatPrice(product.discountPrice)}</span>
          {product.discountPrice < product.price && (
            <span className="text-sm text-slate-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="mt-3 text-sm text-slate-600">{product.stock} in stock</p>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/dashboard/products/${product.id}`}
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            View
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
