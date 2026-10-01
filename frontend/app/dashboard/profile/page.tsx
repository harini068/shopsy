"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ProfilePage() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Your account</h1>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              Dashboard
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Name</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{user?.name ?? "No name"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{user?.email ?? "No email"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Phone</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{user?.phone ?? "Not provided"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{user?.role ?? "customer"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
