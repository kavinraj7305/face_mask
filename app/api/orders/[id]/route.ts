import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getOrder, updateOrderStatus } from "@/lib/orders";
import { isAdminEmail } from "@/lib/admin";
import type { OrderStatus } from "@/lib/types";
import { ORDER_STATUSES } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowed = new Set<OrderStatus>([
  ...ORDER_STATUSES.map((item) => item.id),
  "cancelled",
]);

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  const isOwner = order.user.email.toLowerCase() === session.user.email.toLowerCase();
  if (!isOwner && !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const status = body.status as OrderStatus;
  if (!allowed.has(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const order = await updateOrderStatus(id, status);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
