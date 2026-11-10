import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createOrder, listOrders, listOrdersForUser } from "@/lib/orders";
import { isAdminEmail } from "@/lib/admin";
import { products, sizeOptions } from "@/lib/products";
import type { CartItem, ShippingAddress } from "@/lib/types";
import { cartTotal } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("Your cart is empty.");
  }

  return raw.map((row) => {
    const productId = Number(row?.productId);
    const sizeId = String(row?.sizeId ?? "");
    const quantity = Math.max(1, Math.min(20, Number(row?.quantity) || 1));
    const product = products.find((item) => item.id === productId);
    const size = sizeOptions.find((item) => item.id === sizeId);
    if (!product || !size) {
      throw new Error("One of the products in your cart is no longer available.");
    }
    return {
      productId: product.id,
      name: product.name,
      image: product.image,
      sizeId: size.id,
      sizeLabel: size.label,
      price: size.price,
      courierNote: size.courierNote,
      quantity,
    };
  });
}

function normalizeShipping(raw: unknown): ShippingAddress {
  const value = (raw ?? {}) as Record<string, string>;
  const shipping: ShippingAddress = {
    fullName: String(value.fullName ?? "").trim(),
    phone: String(value.phone ?? "").trim(),
    line1: String(value.line1 ?? "").trim(),
    line2: String(value.line2 ?? "").trim() || undefined,
    city: String(value.city ?? "").trim(),
    state: String(value.state ?? "").trim(),
    pincode: String(value.pincode ?? "").trim(),
  };
  if (
    !shipping.fullName ||
    !shipping.phone ||
    !shipping.line1 ||
    !shipping.city ||
    !shipping.state ||
    !shipping.pincode
  ) {
    throw new Error("Please fill in the complete delivery address.");
  }
  if (!/^[0-9]{10}$/.test(shipping.phone)) {
    throw new Error("Enter a valid 10-digit phone number.");
  }
  if (!/^[0-9]{6}$/.test(shipping.pincode)) {
    throw new Error("Enter a valid 6-digit pincode.");
  }
  return shipping;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sign in with Google to continue." }, { status: 401 });
  }

  const orders = isAdminEmail(session.user.email)
    ? await listOrders()
    : await listOrdersForUser(session.user.email);

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Sign in with Google to place your order." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const items = normalizeItems(body.items);
    const shipping = normalizeShipping(body.shipping);
    const notes = String(body.notes ?? "").trim() || undefined;

    const order = await createOrder({
      user: {
        id: session.user.id ?? session.user.email,
        name: session.user.name ?? shipping.fullName,
        email: session.user.email,
        image: session.user.image ?? undefined,
      },
      shipping,
      items,
      itemsTotal: cartTotal(items),
      notes,
      paymentMethod: "cod",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not place order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
