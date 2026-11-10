"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getFeaturedProducts, sizeOptions, startingPrice } from "@/lib/products";

const featured = getFeaturedProducts();

const Products = () => {
  const router = useRouter();

  return (
    <section id="products" className="bg-[#FAF9F6] px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="uppercase tracking-[0.28em] text-xs text-[#8BA888] mb-3">
            The collection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#3A4F41] leading-tight">
            Two herbal powders. That is the ritual.
          </h2>
          <p className="mt-4 text-[#3A4F41]/75 text-lg leading-relaxed">
            We keep the shelf simple — a daily facial powder and a weekly face pack,
            both mixed fresh at home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {featured.map((product, index) => (
            <article
              key={product.id}
              className="group bg-white rounded-[28px] overflow-hidden border border-[#3A4F41]/10 shadow-[0_20px_50px_rgba(58,79,65,0.08)] cursor-pointer"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <div className="relative h-[22rem] sm:h-[28rem] overflow-hidden bg-[#E8E3D6]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-[#3A4F41] text-white text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                    {index === 0 ? "Everyday ritual" : "Weekly ritual"}
                  </span>
                </div>
              </div>

              <div className="p-7 md:p-9">
                <h3 className="font-serif text-2xl md:text-3xl text-[#3A4F41] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#3A4F41]/70 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-[#8BA888]">From</p>
                    <p className="text-2xl font-serif text-[#3A4F41]">₹{startingPrice}</p>
                    <p className="text-xs text-[#3A4F41]/55 mt-0.5">+ courier on every size</p>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push(`/product/${product.id}`);
                    }}
                    className="bg-[#8BA888] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#3A4F41] transition"
                  >
                    Choose size
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 bg-white border border-[#3A4F41]/10 rounded-2xl px-6 py-7 md:px-10">
          <h3 className="font-serif text-xl text-[#3A4F41] mb-1">Sizes &amp; prices</h3>
          <p className="text-sm text-[#3A4F41]/70 mb-5">
            Same for both powders. Courier is extra on every pack.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sizeOptions.map((size) => (
              <div key={size.id} className="rounded-xl bg-[#FAF9F6] px-4 py-4">
                <p className="font-semibold text-[#3A4F41]">{size.label}</p>
                <p className="text-[#8BA888] font-medium mt-1">
                  ₹{size.price} {size.courierNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
