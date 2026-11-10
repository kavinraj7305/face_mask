"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/componenets/CartProvider";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/checkout");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div className="py-20 text-center text-[#3A4F41]">Preparing checkout…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl text-[#3A4F41] mb-3">Nothing to order yet</h1>
        <Link href="/#products" className="text-[#8BA888] underline">
          Add products to your cart
        </Link>
      </div>
    );
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const shipping = {
      fullName: String(form.get("fullName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      line1: String(form.get("line1") ?? ""),
      line2: String(form.get("line2") ?? ""),
      city: String(form.get("city") ?? ""),
      state: String(form.get("state") ?? ""),
      pincode: String(form.get("pincode") ?? ""),
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        shipping,
        notes: String(form.get("notes") ?? ""),
      }),
    });
    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(data.error || "Could not place the order.");
      return;
    }

    clearCart();
    router.push(`/orders/${data.order.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-[#3A4F41] mb-2">Checkout</h1>
      <p className="text-[#3A4F41]/70 mb-8">
        Signed in as {session?.user?.email}. Your cart stays saved until this order is placed.
      </p>

      <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-4 bg-white rounded-2xl border border-[#3A4F41]/10 p-6">
          <h2 className="font-semibold text-[#3A4F41]">Delivery address</h2>
          <input
            name="fullName"
            required
            defaultValue={session?.user?.name ?? ""}
            placeholder="Full name"
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            name="phone"
            required
            inputMode="numeric"
            placeholder="10-digit phone"
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            name="line1"
            required
            placeholder="Address line 1"
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            name="line2"
            placeholder="Address line 2 (optional)"
            className="w-full border rounded-lg px-4 py-3"
          />
          <div className="grid sm:grid-cols-3 gap-3">
            <input name="city" required placeholder="City" className="border rounded-lg px-4 py-3" />
            <input name="state" required placeholder="State" className="border rounded-lg px-4 py-3" />
            <input
              name="pincode"
              required
              inputMode="numeric"
              placeholder="Pincode"
              className="border rounded-lg px-4 py-3"
            />
          </div>
          <textarea
            name="notes"
            rows={3}
            placeholder="Delivery note (optional)"
            className="w-full border rounded-lg px-4 py-3"
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
        </div>

        <aside className="bg-white rounded-2xl border border-[#3A4F41]/10 p-6 h-fit">
          <h2 className="font-semibold mb-4">Pay on delivery</h2>
          <ul className="space-y-3 mb-4 text-sm">
            {items.map((item) => (
              <li key={`${item.productId}-${item.sizeId}`} className="flex justify-between gap-3">
                <span>
                  {item.name} · {item.sizeLabel} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold mb-2">
            <span>Items total</span>
            <span>₹{total}</span>
          </div>
          <p className="text-xs text-[#3A4F41]/70 mb-6">Courier extra, collected with the order.</p>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#3A4F41] text-white rounded-full py-3 font-semibold disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
