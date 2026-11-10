export type CartItem = {
  productId: number;
  name: string;
  image: string;
  sizeId: string;
  sizeLabel: string;
  price: number;
  courierNote: string;
  quantity: number;
};

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export const ORDER_STATUSES: { id: OrderStatus; label: string }[] = [
  { id: "placed", label: "Order placed" },
  { id: "confirmed", label: "Confirmed" },
  { id: "packed", label: "Packed" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
];

export type ShippingAddress = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  shipping: ShippingAddress;
  items: CartItem[];
  itemsTotal: number;
  notes?: string;
  paymentMethod: "cod";
};

export function cartItemKey(item: Pick<CartItem, "productId" | "sizeId">) {
  return `${item.productId}:${item.sizeId}`;
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
