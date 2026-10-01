"use client";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AdminPage() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Unauthorized</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900">Admin access required</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Admin panel</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Dashboard overview</h1>
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
}
