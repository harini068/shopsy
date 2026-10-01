"use client";

import { useState } from "react";

export type AddressInput = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
};

type AddressFormProps = {
  initialValues?: Partial<AddressInput>;
  submitLabel?: string;
  onSubmit: (values: AddressInput) => void;
};

export function AddressForm({ initialValues = {}, submitLabel = "Save address", onSubmit }: AddressFormProps) {
  const [values, setValues] = useState<AddressInput>({
    fullName: initialValues.fullName ?? "",
    phone: initialValues.phone ?? "",
    address: initialValues.address ?? "",
    city: initialValues.city ?? "",
    state: initialValues.state ?? "",
    pincode: initialValues.pincode ?? "",
    landmark: initialValues.landmark ?? "",
  });

  const handleChange = (field: keyof AddressInput, nextValue: string) => {
    setValues((current) => ({ ...current, [field]: nextValue }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
      className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
          <input value={values.fullName} onChange={(event) => handleChange("fullName", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
          <input value={values.phone} onChange={(event) => handleChange("phone", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
        <input value={values.address} onChange={(event) => handleChange("address", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">City</label>
          <input value={values.city} onChange={(event) => handleChange("city", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">State</label>
          <input value={values.state} onChange={(event) => handleChange("state", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Pincode</label>
          <input value={values.pincode} onChange={(event) => handleChange("pincode", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Landmark</label>
        <input value={values.landmark} onChange={(event) => handleChange("landmark", event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400" />
      </div>

      <button type="submit" className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
        {submitLabel}
      </button>
    </form>
  );
}
