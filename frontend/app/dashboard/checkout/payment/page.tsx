"use client";

import Link from "next/link";
import { useState } from "react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "PhonePe">("COD");

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Payment</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Choose a payment method</h1>

        <div className="mt-8 grid gap-4">
          {([
            { value: "COD", label: "Cash on Delivery", description: "Pay when your order reaches you." },
            { value: "PhonePe", label: "PhonePe", description: "Secure server-side integration architecture for live payment handling." },
          ] as const).map((method) => (
            <button
              key={method.value}
              type="button"
              onClick={() => setPaymentMethod(method.value)}
              className={`rounded-[1.5rem] border p-5 text-left ${
                paymentMethod === method.value ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-lg font-bold text-slate-900">{method.label}</p>
              <p className="mt-1 text-sm text-slate-600">{method.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          Payment credentials are never stored in client-side code. Production integration occurs via secure server-side logic.
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/dashboard/checkout" className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700">
            Back
          </Link>
          <Link href="/dashboard/order-confirmed" className="flex-1 rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
