"use client";

import { useEffect, useState } from "react";
import { AddressForm, type AddressInput } from "@/components/checkout/AddressForm";
import { defaultAddresses, type Address } from "@/lib/shop-data";
import { getAddresses, setAddresses } from "@/lib/storage";

export default function AddressPage() {
  const [addresses, setAddressList] = useState<Address[]>([]);

  const refresh = () => {
    const next = getAddresses().length ? getAddresses() : defaultAddresses;
    setAddressList(next);
    setAddresses(next);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAddAddress = (values: AddressInput) => {
    const next: Address = {
      id: `addr-${Date.now()}`,
      userId: "demo-user",
      fullName: values.fullName,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      landmark: values.landmark,
      isDefault: addresses.length === 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...addresses, next];
    setAddressList(updated);
    setAddresses(updated);
  };

  const handleDelete = (addressId: string) => {
    const updated = addresses.filter((address) => address.id !== addressId);
    setAddressList(updated);
    setAddresses(updated);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Address</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Manage delivery details</h1>
          <div className="mt-6">
            <AddressForm onSubmit={handleAddAddress} submitLabel="Save address" />
          </div>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-900">{address.fullName}</p>
                {address.isDefault && <span className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-600">Default</span>}
              </div>
              <p className="mt-2 text-sm text-slate-600">{address.address}</p>
              <p className="text-sm text-slate-600">{address.city}, {address.state} - {address.pincode}</p>
              <p className="mt-2 text-sm text-slate-600">Phone: {address.phone}</p>
              <div className="mt-4 flex gap-3">
                <button type="button" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                  Set default
                </button>
                <button type="button" onClick={() => handleDelete(address.id)} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
