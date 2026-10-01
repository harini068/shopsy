export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Users</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Customer directory</h1>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-3 text-sm font-semibold text-slate-500 md:grid-cols-4">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
          </div>

          <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-4">
            <span className="font-medium text-slate-800">Demo User</span>
            <span className="text-slate-600">demo@example.com</span>
            <span className="text-slate-600">customer</span>
            <span className="text-green-600">active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
