"use client";

import Link from "next/link";
import { useCart } from "@/componenets/CartProvider";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl text-[#3A4F41] mb-3">Your cart is empty</h1>
        <p className="text-[#3A4F41]/70 mb-8">Add a powder and it will stay here until you order.</p>
        <Link
          href="/#products"
          className="inline-flex bg-[#8BA888] text-white px-6 py-3 rounded-full font-semibold"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-[#3A4F41] mb-8">Your cart</h1>
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.sizeId}`}
              className="bg-white rounded-2xl border border-[#3A4F41]/10 p-4 flex gap-4"
            >
              <img src={item.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-[#3A4F41]">{item.name}</h2>
                <p className="text-sm text-[#3A4F41]/70">{item.sizeLabel}</p>
                <p className="text-sm text-[#8BA888] mt-1">
                  ₹{item.price} {item.courierNote}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      className="w-8 h-8"
                      onClick={() =>
                        updateQuantity(item.productId, item.sizeId, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      className="w-8 h-8"
                      onClick={() =>
                        updateQuantity(item.productId, item.sizeId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-red-700"
                    onClick={() => removeItem(item.productId, item.sizeId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>

        <aside className="bg-white rounded-2xl border border-[#3A4F41]/10 p-6 h-fit">
          <h2 className="font-semibold mb-4">Order summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>₹{total}</span>
          </div>
          <p className="text-sm text-[#3A4F41]/70 mb-6">Courier charges extra at dispatch.</p>
          <Link
            href="/checkout"
            className="block text-center bg-[#3A4F41] text-white rounded-full py-3 font-semibold"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
