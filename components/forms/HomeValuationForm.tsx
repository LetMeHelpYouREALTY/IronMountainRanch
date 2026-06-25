"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HomeValuationFormProps = {
  defaultVillage?: string;
};

export function HomeValuationForm({ defaultVillage = "" }: HomeValuationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    village: defaultVillage,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/home-valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Failed to submit valuation request");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        village: defaultVillage,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-xl font-semibold text-green-900 mb-2">Request received</h3>
        <p className="text-green-700">
          Dr. Jan Duffy will prepare an Iron Mountain Ranch market analysis and contact you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setSuccess(false)}
        >
          Submit another address
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="valuation-name" className="block text-sm font-medium mb-1">
          Full name <span className="text-red-500">*</span>
        </label>
        <Input
          id="valuation-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="valuation-email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="valuation-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="valuation-phone" className="block text-sm font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <Input
            id="valuation-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="(702) 555-1234"
          />
        </div>
      </div>

      <div>
        <label htmlFor="valuation-address" className="block text-sm font-medium mb-1">
          Property address <span className="text-red-500">*</span>
        </label>
        <Input
          id="valuation-address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="123 Village St, Las Vegas NV 89131"
        />
      </div>

      <div>
        <label htmlFor="valuation-village" className="block text-sm font-medium mb-1">
          Village (optional)
        </label>
        <Input
          id="valuation-village"
          name="village"
          value={formData.village}
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. Wolf Creek, Iron Mountain Estates"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Get my home valuation"}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        By submitting, you agree to be contacted about your Iron Mountain Ranch property.
      </p>
    </form>
  );
}
