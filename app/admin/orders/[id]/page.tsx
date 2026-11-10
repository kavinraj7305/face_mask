"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Order, OrderStatus } from "@/lib/types";
import { ORDER_STATUSES } from "@/lib/types";
import { OrderDetails } from "@/componenets/OrderDetails";

export default function AdminOrderPage() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order not found.");
        setOrder(data.order);
      })
      .catch((err: Error) => setError(err.message));
  }, [id]);

  const updateStatus = async (status: OrderStatus) => {
    setSaving(true);
    setError("");
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) {
      setError(data.error || "Could not update status.");
      return;
    }
    setOrder(data.order);
  };

  if (error && !order) {
    return <div className="py-20 text-center text-red-700">{error}</div>;
  }

  if (!order) {
    return <div className="py-20 text-center">Loading order…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/admin" className="text-sm text-[#3A4F41]/70 hover:text-[#3A4F41]">
        ← All orders
      </Link>
      <div className="mt-6 bg-[#F4F1EA] rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#3A4F41]">Update order status</p>
          {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
        </div>
        <select
          value={order.status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value as OrderStatus)}
          className="border rounded-lg px-4 py-2 bg-white"
        >
          {ORDER_STATUSES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <OrderDetails order={order} heading="Ship to" />
    </div>
  );
}
