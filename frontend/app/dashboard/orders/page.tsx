"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice, type OrderRecord } from "@/lib/shop-data";
import { getOrders } from "@/lib/storage";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Orders</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Your order history</h1>
          </div>
          <Link href="/dashboard/categories" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Continue shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[1.75rem] bg-white p-10 text-center text-slate-600 ring-1 ring-slate-200">
            No orders yet. Your purchases will appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Order ID</p>
                    <p className="text-lg font-bold text-slate-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <p className="text-lg font-bold text-slate-900">{order.orderStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="text-lg font-bold text-slate-900">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link href={`/dashboard/orders/${order.id}`} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                    View details
                  </Link>
                  <Link href="/dashboard/rating" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    Rate products
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
