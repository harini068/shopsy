"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice, getProductById, type OrderRecord } from "@/lib/shop-data";
import { getOrders } from "@/lib/storage";

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "ord-demo";
  const orders = getOrders();
  const order = orders.find((entry) => entry.id === orderId) ?? null;

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-black text-slate-900">Order not found</h1>
          <Link href="/dashboard/categories" className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">Order confirmed</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">✓ Successfully placed</h1>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Order ID</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{order.id}</p>
            <p className="mt-5 text-sm text-slate-500">Payment method</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{order.paymentMethod}</p>
            <p className="mt-5 text-sm text-slate-500">Order status</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{order.orderStatus}</p>
          </div>

          <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total amount</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{formatPrice(order.totalAmount)}</p>
            <p className="mt-5 text-sm text-slate-500">Payment status</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{order.paymentStatus}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {order.items.map((item) => {
            const product = getProductById(item.productId);
            return (
              <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="font-bold text-slate-900">{item.productName}</p>
                  <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{formatPrice(item.subtotal)}</p>
                  {product && <p className="text-xs text-slate-500">{product.stock} left</p>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/categories" className="flex-1 rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white">
            Continue shopping
          </Link>
          <Link href="/dashboard/orders" className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700">
            View orders
          </Link>
        </div>
      </div>
    </div>
  );
}
