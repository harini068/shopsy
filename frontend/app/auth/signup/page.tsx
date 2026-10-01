"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm, type AuthFormValues } from "@/components/auth/AuthForm";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (values: AuthFormValues) => {
    const nextUser = {
      name: values.name ?? "New Customer",
      email: values.email,
      phone: values.phone ?? "",
      role: "customer" as const,
    };

    signUp(nextUser, values.password);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="bg-slate-900 px-6 py-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Create your account</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Sign up</h1>
        </div>

        <div className="p-6">
          <AuthForm mode="signup" onSubmit={handleSubmit} />

          <p className="mt-5 text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link href="/auth/signin" className="font-semibold text-slate-900 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
