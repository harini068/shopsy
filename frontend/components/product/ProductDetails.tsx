"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/storage";
import { formatPrice, type Product } from "@/lib/shop-data";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = useMemo(
    () => (product.discountPrice > 0 ? product.discountPrice : product.price),
    [product.discountPrice, product.price],
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/dashboard/checkout");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
          <img src={selectedImage} alt={product.name} className="h-[420px] w-full rounded-[1.5rem] object-cover" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {product.images.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-2xl border ${
                selectedImage === image ? "border-slate-900" : "border-slate-200"
              } bg-white p-1`}
            >
              <img src={image} alt={product.name} className="h-24 w-full rounded-xl object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Product details</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">{product.name}</h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <span>★ {product.rating}</span>
          <span>•</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <p className="text-3xl font-black text-slate-900">{formatPrice(currentPrice)}</p>
          {product.discountPrice < product.price && (
            <p className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</p>
          )}
        </div>

        <p className="mt-5 text-base leading-7 text-slate-600">{product.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Quantity</span>
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="h-10 w-10 text-xl font-semibold text-slate-700"
            >
              −
            </button>
            <span className="min-w-10 text-center text-sm font-semibold text-slate-800">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
              className="h-10 w-10 text-xl font-semibold text-slate-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Buy now
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
          <p className="font-semibold text-slate-800">Available stock: {product.stock}</p>
          <p className="mt-2">Free shipping on orders above $50.</p>
        </div>
      </div>
    </div>
  );
}
