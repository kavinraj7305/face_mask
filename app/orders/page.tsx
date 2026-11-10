"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Order } from "@/lib/types";
import { StatusBadge } from "@/componenets/OrderDetails";

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/orders");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/orders")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load orders.");
        setOrders(data.orders);
      })
      .catch((err: Error) => setError(err.message));
  }, [status]);

  if (status !== "authenticated") {
    return <div className="py-20 text-center">Loading your orders…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-[#3A4F41] mb-2">Your orders</h1>
      <p className="text-[#3A4F41]/70 mb-8">Track each Bavapriya order the way you would on Amazon.</p>
      {error && <p className="text-red-700 mb-4">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-[#3A4F41]/70">
          No orders yet.{" "}
          <Link href="/#products" className="underline">
            Start a cart
          </Link>
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/orders/${order.id}`}
                className="block bg-white rounded-2xl border border-[#3A4F41]/10 p-5 hover:border-[#8BA888]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#3A4F41]">{order.id}</p>
                    <p className="text-sm text-[#3A4F41]/70">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")} · {order.items.length} item
                      {order.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={order.status} />
                    <p className="mt-2 font-semibold">₹{order.itemsTotal}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
