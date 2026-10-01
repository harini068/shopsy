import { getRatings } from "@/lib/storage";

export default function AdminRatingsPage() {
  const ratings = getRatings();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Ratings</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Customer reviews</h1>
        </div>

        <div className="space-y-4">
          {ratings.map((rating) => (
            <div key={rating.id} className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900">{rating.productId}</p>
                <p className="text-amber-500">{'★'.repeat(rating.rating)}</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">{rating.review || "No review provided."}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
