"use client";

import Link from "next/link";
import { getProductById, formatPrice } from "@/lib/shop-data";
import { removeFromCart, updateCartQuantity, type getCart } from "@/lib/storage";

type ProductLookup = Exclude<ReturnType<typeof getProductById>, null>;

type CartEntryWithProduct = {
  productId: string;
  quantity: number;
  price: number;
  product: ProductLookup;
};

type CartTableProps = {
  entries: ReturnType<typeof getCart>;
  onQuantityChange?: (productId: string, delta: number) => void;
  onRemove?: (productId: string) => void;
};

export function CartTable({ entries, onQuantityChange, onRemove }: CartTableProps) {
  const data: CartEntryWithProduct[] = entries.flatMap((entry) => {
    const product = getProductById(entry.productId);

    if (!product) {
      return [];
    }

    return [{ ...entry, product }];
  });

  const subtotal = data.reduce((total, entry) => total + entry.product.discountPrice * entry.quantity, 0);

  if (!data.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-xl font-bold text-slate-800">Your cart is empty.</p>
        <Link href="/dashboard/categories" className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {data.map((entry) => (
        <div key={entry.productId} className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
          {(() => {
            const product = entry.product;
            if (!product) return null;

            return (
              <>
                <img src={product.images[0]} alt={product.name} className="h-24 w-24 rounded-2xl object-cover" />

                <div className="flex-1">
                  <p className="text-lg font-bold text-slate-900">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{formatPrice(product.discountPrice)} each</p>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  <button 
                    type="button" 
                    onClick={() => {
                      if (onQuantityChange) {
                        onQuantityChange(entry.productId, -1);
                      } else {
                        updateCartQuantity(entry.productId, -1);
                      }
                    }} 
                    className="h-8 w-8 text-lg font-semibold text-slate-700"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-slate-800">{entry.quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (onQuantityChange) {
                        onQuantityChange(entry.productId, 1);
                      } else {
                        updateCartQuantity(entry.productId, 1);
                      }
                    }} 
                    className="h-8 w-8 text-lg font-semibold text-slate-700"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">{formatPrice(product.discountPrice * entry.quantity)}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (onRemove) {
                        onRemove(entry.productId);
                      } else {
                        removeFromCart(entry.productId);
                      }
                    }}
                    className="mt-2 text-sm font-semibold text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      ))}

      <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xl font-black">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
