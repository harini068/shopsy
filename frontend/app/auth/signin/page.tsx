"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm, type AuthFormValues } from "@/components/auth/AuthForm";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (values: AuthFormValues) => {
    const user = signIn(values.email, values.password);
    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="bg-slate-900 px-6 py-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Sign in</h1>
        </div>

        <div className="p-6">
          <AuthForm mode="signin" onSubmit={handleSubmit} />

          <p className="mt-5 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-semibold text-slate-900 underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
