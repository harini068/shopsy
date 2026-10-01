import Link from "next/link";
import { formatPrice, getProductById } from "@/lib/shop-data";
import { getOrders } from "@/lib/storage";

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const order = getOrders().find((entry) => entry.id === params.orderId) ?? null;

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-black text-slate-900">Order not found</h1>
          <Link href="/dashboard/orders" className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Order details</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{order.id}</h1>
          </div>
          <Link href="/dashboard/orders" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            Back to orders
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Order status</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{order.orderStatus}</p>
            <p className="mt-5 text-sm text-slate-500">Payment status</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{order.paymentStatus}</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{formatPrice(order.totalAmount)}</p>
            <p className="mt-5 text-sm text-slate-500">Method</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{order.paymentMethod}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {order.items.map((item) => {
            const product = getProductById(item.productId);
            return (
              <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="font-bold text-slate-900">{item.productName}</p>
                  <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                  {product && <p className="text-sm text-slate-600">Category: {product.categoryId}</p>}
                </div>
                <p className="text-lg font-bold text-slate-900">{formatPrice(item.subtotal)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
