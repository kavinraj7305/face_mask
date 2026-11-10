import type { Order, OrderStatus } from "@/lib/types";
import { ORDER_STATUSES } from "@/lib/types";

const labels: Record<OrderStatus, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const tones: Record<OrderStatus, string> = {
  placed: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  packed: "bg-indigo-100 text-indigo-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${tones[status]}`}>
      {labels[status]}
    </span>
  );
}

function stepIndex(status: OrderStatus) {
  if (status === "cancelled") return -1;
  return ORDER_STATUSES.findIndex((item) => item.id === status);
}

export function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <p className="text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
        This order was cancelled.
      </p>
    );
  }

  const current = stepIndex(status);
  return (
    <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {ORDER_STATUSES.map((step, index) => {
        const done = index <= current;
        return (
          <li
            key={step.id}
            className={`rounded-xl border px-3 py-3 text-sm ${
              done
                ? "border-[#8BA888] bg-[#F4F1EA] text-[#3A4F41]"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <span className="block text-xs uppercase tracking-wide mb-1">
              {done ? "Done" : "Pending"}
            </span>
            {step.label}
          </li>
        );
      })}
    </ol>
  );
}

export function OrderDetails({
  order,
  heading = "Order details",
}: {
  order: Order;
  heading?: string;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8BA888]">Order</p>
          <h1 className="text-2xl md:text-3xl font-serif text-[#3A4F41]">{order.id}</h1>
          <p className="text-sm text-[#3A4F41]/70 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <OrderTimeline status={order.status} />

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-[#3A4F41]/10 p-6">
          <h2 className="font-semibold text-[#3A4F41] mb-3">{heading}</h2>
          <p className="font-medium">{order.shipping.fullName}</p>
          <p className="text-[#3A4F41]/80">{order.shipping.line1}</p>
          {order.shipping.line2 && <p className="text-[#3A4F41]/80">{order.shipping.line2}</p>}
          <p className="text-[#3A4F41]/80">
            {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
          </p>
          <p className="mt-3 text-sm">Phone: {order.shipping.phone}</p>
        </section>

        <section className="bg-white rounded-2xl border border-[#3A4F41]/10 p-6">
          <h2 className="font-semibold text-[#3A4F41] mb-3">Customer & payment</h2>
          <p>{order.user.name}</p>
          <p className="text-[#3A4F41]/80">{order.user.email}</p>
          <p className="mt-3 text-sm">Payment: Cash on delivery</p>
          <p className="text-sm text-[#3A4F41]/70">Courier charges extra, as applicable.</p>
          {order.notes && (
            <p className="mt-3 text-sm bg-[#F4F1EA] rounded-lg px-3 py-2">Note: {order.notes}</p>
          )}
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-[#3A4F41]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#3A4F41]/10">
          <h2 className="font-semibold text-[#3A4F41]">Items</h2>
        </div>
        <ul>
          {order.items.map((item) => (
            <li
              key={`${item.productId}-${item.sizeId}`}
              className="flex gap-4 px-6 py-4 border-b border-[#3A4F41]/8 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#3A4F41]">{item.name}</p>
                <p className="text-sm text-[#3A4F41]/70">
                  {item.sizeLabel} · Qty {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-[#3A4F41]">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="px-6 py-4 bg-[#FAF9F6] flex justify-between">
          <span className="text-[#3A4F41]/80">Items total</span>
          <span className="font-bold text-[#3A4F41]">₹{order.itemsTotal}</span>
        </div>
      </section>
    </div>
  );
}
