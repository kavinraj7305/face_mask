import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getIngredientItems } from "@/lib/products";

const RitualIngredients = () => {
  const featured = getFeaturedProducts();

  return (
    <section className="max-w-5xl mx-auto px-6 pb-4">
      <div className="mb-8">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-2">
          Inside the powder
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-[#3A4F41]">
          Product ingredients
        </h2>
        <p className="mt-3 text-[#3A4F41]/75 max-w-2xl">
          The finder does not swap the product. It tells you which kitchen mix-ins to
          add to Bavapriya Facial Powder — or to the Herbal Face Pack — according to
          your skin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((product) => {
          const items = getIngredientItems(product);
          return (
            <article
              key={product.id}
              className="bg-white rounded-2xl border border-[#3A4F41]/10 overflow-hidden shadow-sm"
            >
              <div className="relative h-44 bg-[#E8E3D6]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#3A4F41] mb-1">{product.name}</h3>
                <p className="text-sm text-[#3A4F41]/70 mb-4">{product.benefits}</p>
                <ul className="space-y-2 mb-5">
                  {items.map((item) => (
                    <li key={item.name} className="text-[#3A4F41]/85">
                      <span className="font-medium">{item.name}</span>
                      {item.note ? (
                        <span className="text-[#3A4F41]/65"> — {item.note}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/product/${product.id}`}
                  className="text-sm font-semibold text-[#3A4F41] underline underline-offset-4 hover:text-[#8BA888]"
                >
                  View sizes
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RitualIngredients;
