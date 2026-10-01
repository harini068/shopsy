"use client";

import { useState } from "react";

export type AuthFormValues = {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
};

type AuthFormProps = {
  mode: "signin" | "signup";
  onSubmit: (values: AuthFormValues) => Promise<void> | void;
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [values, setValues] = useState<AuthFormValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof AuthFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!values.name?.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!values.email.trim() || !values.email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }

      if (values.password.trim().length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      if (values.password !== values.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    if (mode === "signin") {
      if (!values.email.trim() || !values.email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }

      if (values.password.trim().length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === "signup" && (
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={values.name ?? ""}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            placeholder="John Smith"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          placeholder="you@example.com"
        />
      </div>

      {mode === "signup" && (
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={values.phone ?? ""}
            onChange={(event) => handleChange("phone", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            placeholder="+1 234 567 890"
          />
        </div>
      )}

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(event) => handleChange("password", event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          placeholder="Enter your password"
        />
      </div>

      {mode === "signup" && (
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword ?? ""}
            onChange={(event) => handleChange("confirmPassword", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            placeholder="Repeat your password"
          />
        </div>
      )}

      {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}
