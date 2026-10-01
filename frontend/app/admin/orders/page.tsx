import { getOrders } from "@/lib/storage";

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Orders</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">All orders</h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">{order.id}</p>
                <p className="text-sm text-slate-600">{order.paymentMethod}</p>
              </div>
              <p className="text-sm text-slate-600">Status: {order.orderStatus}</p>
              <p className="text-sm text-slate-600">Payment: {order.paymentStatus}</p>
              <button type="button" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Update</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
