"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Order, OrderStatus } from "@/lib/types";
import { StatusBadge } from "@/componenets/OrderDetails";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load orders.");
        setOrders(data.orders);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = status === "all" || order.status === status;
      const hay = `${order.id} ${order.user.email} ${order.user.name} ${order.shipping.phone}`.toLowerCase();
      return matchesStatus && hay.includes(query.toLowerCase());
    });
  }, [orders, query, status]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-[#3A4F41] mb-2">Admin orders</h1>
      <p className="text-[#3A4F41]/70 mb-8">
        See every order, customer, address and status — similar to an Amazon seller view.
      </p>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search order ID, name, email or phone"
          className="flex-1 border rounded-lg px-4 py-3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus | "all")}
          className="border rounded-lg px-4 py-3"
        >
          <option value="all">All statuses</option>
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <p className="text-red-700 mb-4">{error}</p>}

      <div className="bg-white rounded-2xl border border-[#3A4F41]/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F4F1EA] text-left">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-t border-[#3A4F41]/8">
                <td className="px-4 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="font-semibold text-[#3A4F41] underline">
                    {order.id}
                  </Link>
                  <p className="text-xs text-[#3A4F41]/60">
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p>{order.user.name}</p>
                  <p className="text-[#3A4F41]/70">{order.user.email}</p>
                </td>
                <td className="px-4 py-4">{order.items.length}</td>
                <td className="px-4 py-4 font-semibold">₹{order.itemsTotal}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#3A4F41]/60">
                  No orders match this view yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
