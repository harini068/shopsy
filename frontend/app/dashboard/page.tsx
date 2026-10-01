"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Hello, {user?.name ?? "Shopper"}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/profile" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Profile
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Orders", value: "08" },
            { label: "Saved Items", value: "24" },
            { label: "Wishlist", value: "12" },
            { label: "Rewards", value: "3.2k" },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick access</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "Categories",
                "Search",
                "Cart",
                "Checkout",
                "Orders",
                "Profile",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Account</p>
            <p className="mt-3 text-xl font-bold">{user?.email ?? "No email available"}</p>
            <p className="mt-2 text-sm text-slate-300">Role: {user?.role ?? "customer"}</p>
            <Link href="/dashboard/profile" className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              View profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
