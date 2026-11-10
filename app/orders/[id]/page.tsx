"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { Order } from "@/lib/types";
import { OrderDetails } from "@/componenets/OrderDetails";

export default function OrderPage() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const { status } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=/orders/${id}`);
    }
  }, [status, router, id]);

  useEffect(() => {
    if (status !== "authenticated" || !id) return;
    fetch(`/api/orders/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order not found.");
        setOrder(data.order);
      })
      .catch((err: Error) => setError(err.message));
  }, [status, id]);

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <p className="text-red-700 mb-4">{error}</p>
        <Link href="/orders" className="underline">
          Back to orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return <div className="py-20 text-center">Loading order…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/orders" className="text-sm text-[#3A4F41]/70 hover:text-[#3A4F41]">
        ← Your orders
      </Link>
      <div className="mt-6">
        <OrderDetails order={order} heading="Delivery address" />
      </div>
    </div>
  );
}
