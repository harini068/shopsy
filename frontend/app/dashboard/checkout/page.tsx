"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice, getProductById, type Address, type OrderRecord } from "@/lib/shop-data";
import { clearCart, getAddresses, getCart, getCartTotal, getOrders, setOrders } from "@/lib/storage";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(getCart());
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "PhonePe">("COD");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionStarted = useRef(false);

  useEffect(() => {
    const nextAddresses = getAddresses();
    setAddresses(nextAddresses);
    setSelectedAddressId(nextAddresses.find((address) => address.isDefault)?.id ?? nextAddresses[0]?.id ?? "");
    setCart(getCart());
  }, []);

  const subtotal = useMemo(() => getCartTotal(cart), [cart]);
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? null;

  const createOrder = () => {
    if (submissionStarted.current) return;
    if (paymentMethod !== "COD") {
      setError("PhonePe checkout is unavailable until server-side payment verification is configured.");
      return;
    }
    if (!selectedAddress || !cart.length) {
      setError("Choose a delivery address and add items before placing your order.");
      return;
    }

    const orderItems = cart.flatMap((entry) => {
      const product = getProductById(entry.productId);
      if (!product || !Number.isSafeInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > product.stock) {
        return [];
      }

      const price = product.discountPrice > 0 ? product.discountPrice : product.price;
      return [{
          productId: product.id,
          productName: product.name,
          quantity: entry.quantity,
          price,
          subtotal: price * entry.quantity,
        }];
    });

    if (orderItems.length !== cart.length) {
      setError("Your cart has an unavailable product or quantity. Update the cart and try again.");
      return;
    }

    submissionStarted.current = true;
    setIsSubmitting(true);
    setError("");

    const orderId = `ord-${Date.now()}`;
    const previousOrders = getOrders();
    const subtotalAmount = orderItems.reduce((total, item) => total + item.subtotal, 0);
    const totalAmount = subtotalAmount * 1.08;

    const order: OrderRecord = {
      id: orderId,
      userId: "demo-user",
      addressId: selectedAddress.id,
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
      totalAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: orderItems,
    };

    setOrders([...previousOrders, order]);
    clearCart();
    router.push(`/dashboard/order-confirmed?orderId=${orderId}`);
  };

  if (!cart.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-black text-slate-900">Your cart is empty</h1>
          <Link href="/dashboard/categories" className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Checkout</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Confirm your order</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Delivery address</h2>
                <Link href="/dashboard/checkout/address" className="text-sm font-semibold text-slate-700 underline">Manage</Link>
              </div>

              <div className="space-y-3">
                {addresses.map((address) => (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => setSelectedAddressId(address.id)}
                    className={`w-full rounded-2xl border p-4 text-left ${
                      selectedAddressId === address.id ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900">{address.fullName}</p>
                      {address.isDefault && <span className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-600">Default</span>}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Payment method</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {(["COD"] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-2xl border p-4 text-left ${
                      paymentMethod === method ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <p className="font-semibold text-slate-900">{method === "COD" ? "Cash on Delivery" : "PhonePe"}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {method === "COD" ? "Pay when the order arrives." : "Secure server-side payment architecture."}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
                PhonePe is unavailable until a server-side gateway and payment verification are configured.
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <div className="mt-5 space-y-4">
              {cart.map((entry) => {
                const product = getProductById(entry.productId);
                if (!product) return null;
                return (
                  <div key={entry.productId} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-600">Qty: {entry.quantity}</p>
                    </div>
                    <p className="font-bold text-slate-900">{formatPrice(entry.price * entry.quantity)}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>Free</span></div>
              <div className="flex items-center justify-between"><span>Tax</span><span>{formatPrice(subtotal * 0.08)}</span></div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-black text-slate-900">
              <span>Total</span>
              <span>{formatPrice(subtotal * 1.08)}</span>
            </div>

            <button
              type="button"
              onClick={createOrder}
              disabled={isSubmitting || !selectedAddress || !cart.length}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Placing order..." : "Confirm order"}
            </button>
            {error && <p role="alert" className="mt-3 text-sm font-medium text-rose-700">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
