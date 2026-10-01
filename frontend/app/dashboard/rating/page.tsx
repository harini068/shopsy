"use client";

import { useState } from "react";
import { getOrders, getRatings, setRatings } from "@/lib/storage";
import { getProductById, type Rating } from "@/lib/shop-data";

export default function RatingPage() {
  const orders = getOrders();
  const order = orders[orders.length - 1];
  const [selectedRating, setSelectedRating] = useState(5);
  const [review, setReview] = useState("");

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-black text-slate-900">No completed order to rate</h1>
        </div>
      </div>
    );
  }

  const product = order.items[0] ? getProductById(order.items[0].productId) : null;

  const handleSubmit = () => {
    if (!product) return;

    const newRating: Rating = {
      id: `rating-${Date.now()}`,
      userId: "demo-user",
      productId: product.id,
      orderId: order.id,
      rating: selectedRating,
      review,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const ratings = getRatings();
    setRatings([...ratings, newRating]);
    setReview("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Rate your purchase</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">How did it go?</h1>

        {product && (
          <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-lg font-bold text-slate-900">{product.name}</p>
            <p className="text-sm text-slate-600">Order: {order.id}</p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedRating(star)}
              className={`text-3xl ${star <= selectedRating ? "text-amber-400" : "text-slate-300"}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="Write a short review for this product"
          className="mt-6 min-h-[120px] w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
        />

        <button type="button" onClick={handleSubmit} className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
          Submit rating
        </button>
      </div>
    </div>
  );
}
