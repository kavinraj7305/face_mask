import { promises as fs } from "fs";
import path from "path";
import type { Order, OrderStatus } from "@/lib/types";

const filePath = path.join(process.cwd(), "data", "orders.json");

async function readAll(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf8");
}

function makeId() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BP-${y}${m}${d}-${rand}`;
}

export async function listOrders() {
  const orders = await readAll();
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listOrdersForUser(email: string) {
  const orders = await listOrders();
  return orders.filter((order) => order.user.email.toLowerCase() === email.toLowerCase());
}

export async function getOrder(id: string) {
  const orders = await readAll();
  return orders.find((order) => order.id === id) ?? null;
}

export async function createOrder(input: Omit<Order, "id" | "createdAt" | "updatedAt" | "status">) {
  const orders = await readAll();
  const now = new Date().toISOString();
  const order: Order = {
    ...input,
    id: makeId(),
    status: "placed",
    createdAt: now,
    updatedAt: now,
  };
  orders.push(order);
  await writeAll(orders);
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = await readAll();
  const index = orders.findIndex((order) => order.id === id);
  if (index < 0) return null;
  orders[index] = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  await writeAll(orders);
  return orders[index];
}
