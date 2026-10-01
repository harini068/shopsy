"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CartTable } from "@/components/cart/CartTable";
import { getCart, getCartTotal, removeFromCart, updateCartQuantity } from "@/lib/storage";
import type { CartEntry } from "@/lib/shop-data";

export default function CartPage() {
  const [entries, setEntries] = useState<CartEntry[]>([]);

  const refreshCart = () => setEntries(getCart());

  useEffect(() => {
    refreshCart();
  }, []);

  const subtotal = useMemo(() => getCartTotal(entries), [entries]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Cart</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Your shopping cart</h1>
          </div>
          <Link href="/dashboard/categories" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Continue shopping
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <CartTable
            entries={entries}
            onQuantityChange={(productId, delta) => {
              updateCartQuantity(productId, delta);
              refreshCart();
            }}
            onRemove={(productId) => {
              removeFromCart(productId);
              refreshCart();
            }}
          />

          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Summary</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-black text-slate-900">
              <span>Total</span>
              <span>$ {(subtotal * 1.08).toFixed(2)}</span>
            </div>

            <Link href="/dashboard/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
