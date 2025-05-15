'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Head from 'next/head';

const products = [
    {
      id: 1,
      name: "Ayurvedic Glow Face Pack",
      category: "Face Care",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne, improves complexion",
      image: "https://i.pinimg.com/736x/4d/00/1c/4d001c84470bce9f13c034a05399eab3.jpg",
      description: "Our signature Ayurvedic face pack is formulated with 12 rare herbs gathered from the Himalayan foothills. This potent blend has been used for centuries in traditional Indian skincare rituals to promote radiant, youthful-looking skin.",
      ingredients: "Turmeric, Sandalwood, Neem, Tulsi, Manjistha, Licorice Root, Fuller's Earth, Orange Peel Powder, Rose Petals, Aloe Vera",
      usage: "Mix 2 tablespoons with rose water or milk to form a paste. Apply evenly on face and neck. Leave for 15-20 minutes. Rinse with lukewarm water. Use 2-3 times weekly for best results.",
      shelfLife: "24 months from date of manufacture",
      weight: "Available in 100g, 250g, 500g, and 1kg packs",
      certification: "Certified Organic by USDA, Ayush Premium Mark",
      rating: 4.8,
      reviews: 124,
      isBestSeller: true,
      discount: "Buy 1kg get 100g free"
    },
    {
      id: 2,
      name: "Turmeric Face Pack",
      category: "Face Care",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image: "https://i.pinimg.com/474x/be/52/f4/be52f43cf114b93d0013c2f9c64b10ba.jpg",
      description: "A traditional turmeric-based face pack known for its antiseptic and skin-brightening properties. Perfect for reducing blemishes and achieving a golden glow.",
      ingredients: "Turmeric, Sandalwood, Multani Mitti, Gram Flour",
      usage: "Mix with curd or rose water. Apply on face and neck. Leave for 15 minutes. Wash off gently.",
      shelfLife: "18 months",
      weight: "100g, 250g, 500g",
      certification: "Ayush Certified",
      rating: 4.6,
      reviews: 87,
      isBestSeller: false,
      discount: "Buy 500g get 10% off"
    },
    {
      id: 3,
      name: "Herbal Face Pack",
      category: "Face Care",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image: "https://i.pinimg.com/736x/6d/f4/72/6df4720fc4e18483489b8fdff857e08f.jpg",
      description: "A natural face pack enriched with herbs that rejuvenate your skin and maintain its moisture balance.",
      ingredients: "Neem, Tulsi, Aloe Vera, Multani Mitti",
      usage: "Mix with water or milk, apply for 20 minutes, rinse off with cold water.",
      shelfLife: "18 months",
      weight: "100g, 250g, 500g, 1kg",
      certification: "ISO Certified",
      rating: 4.5,
      reviews: 102,
      isBestSeller: false,
      discount: "Free shipping on orders above ₹1000"
    },
    {
      id: 4,
      name: "Herbal Ubtan Pack",
      category: "Face Care",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image: "https://i.pinimg.com/736x/42/27/96/422796a4cf6404e4e365c802aeac0192.jpg",
      description: "A traditional ubtan formulation made with pure herbs that exfoliates and detoxifies skin naturally.",
      ingredients: "Turmeric, Rose Petals, Sandalwood, Chickpea Flour",
      usage: "Use daily as a cleanser or weekly as a face pack with milk or rose water.",
      shelfLife: "24 months",
      weight: "200g, 500g, 1kg",
      certification: "USDA Organic",
      rating: 4.7,
      reviews: 98,
      isBestSeller: true,
      discount: "Buy 2 get 1 free"
    },
    {
      id: 5,
      name: "Sandalwood Nalangu Maavu",
      category: "Nalangu Mavu",
      price: "₹500/kg",
      benefits: "Cooling effect, improves complexion",
      image: "https://i.pinimg.com/736x/1f/6f/fe/1f6ffeffb0f0e75f6a368716783c2060.jpg",
      description: "A traditional body cleanser with cooling herbs and sandalwood for glowing and refreshed skin.",
      ingredients: "Sandalwood, Vetiver, Rose Powder, Wild Turmeric",
      usage: "Apply on wet skin, gently scrub, and rinse. Suitable for all skin types.",
      shelfLife: "18 months",
      weight: "250g, 500g, 1kg",
      certification: "Handmade and Natural",
      rating: 4.6,
      reviews: 76,
      isBestSeller: true,
      discount: "10% off on first purchase"
    },
    {
      id: 6,
      name: "Herbal Bath Powder",
      category: "Bath Powder",
      price: "₹500/kg",
      benefits: "Softens skin, natural fragrance",
      image: "https://i.pinimg.com/736x/86/c9/4d/86c94ddd04322d22555c766d5d0c6484.jpg",
      description: "A refreshing herbal blend used in place of soap for a chemical-free bathing experience.",
      ingredients: "Green Gram, Rose Petals, Orange Peel, Neem Leaves",
      usage: "Use directly on wet skin or mix with water to form a paste before applying.",
      shelfLife: "12 months",
      weight: "500g, 1kg",
      certification: "Natural and Preservative-free",
      rating: 4.4,
      reviews: 61,
      isBestSeller: false,
      discount: "Buy 1kg and get 50g free"
    },
    {
      id: 7,
      name: "Ayurvedic Bath Powder",
      category: "Bath Powder",
      price: "₹500/kg",
      benefits: "Softens skin, natural fragrance",
      image: "https://i.pinimg.com/736x/28/af/6e/28af6e60961df70f1bcaacaa7eab9b6e.jpg",
      description: "An age-old ayurvedic bathing formula to detoxify, exfoliate and nourish the skin naturally.",
      ingredients: "Vetiver, Sandalwood, Tulsi, Amla, Reetha",
      usage: "Mix with water before applying to skin. Ideal for daily use.",
      shelfLife: "24 months",
      weight: "100g, 500g, 1kg",
      certification: "Ayush Certified",
      rating: 4.3,
      reviews: 55,
      isBestSeller: false,
      discount: "Combo offer: 1kg Bath + 250g Nalangu for ₹900"
    },
    {
      id: 8,
      name: "Herbal Holi Colour Powder",
      category: "Holi Colors",
      price: "₹500/kg",
      benefits: "Chemical-free, skin-friendly",
      image: "https://i.pinimg.com/736x/eb/32/28/eb3228ee69ef5c129e7c85f1f9794e19.jpg",
      description: "Celebrate Holi with our skin-safe, eco-friendly colors made from 100% natural ingredients.",
      ingredients: "Cornstarch, Beetroot Extract, Turmeric, Indigo Leaf",
      usage: "Use directly during festive celebrations. Easily washable and safe for kids.",
      shelfLife: "12 months",
      weight: "500g, 1kg",
      certification: "Eco-Certified & Lab Tested",
      rating: 4.9,
      reviews: 143,
      isBestSeller: true,
      discount: "Festival offer: Buy 3kg get 500g free"
    }
  ];
  

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find((p) => p.id === parseInt(id as string));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id)
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Product not found
      </div>
    );

  return (
    <>
      <Head>
        <title>{product.name} | Herbal Products</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-w-6xl mx-auto p-6"
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full md:w-96 rounded-lg shadow-lg object-cover"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-1 font-medium">{product.category}</p>
            <p className="text-3xl font-bold text-green-700 mb-4">{product.price}</p>

            <p className="mb-4">{product.benefits}</p>

            {/* Quantity selector */}
            <div className="flex items-center gap-3 mb-6">
              <button
                className="w-10 h-10 rounded-md bg-gray-300 hover:bg-gray-400"
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                className="w-10 h-10 rounded-md bg-gray-300 hover:bg-gray-400"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Tabs */}
            <div className="mb-4 border-b border-gray-300">
              <nav className="flex space-x-4">
                {[
                  { key: 'description', label: 'Description' },
                  { key: 'ingredients', label: 'Ingredients' },
                  { key: 'usage', label: 'Usage' },
                  { key: 'shelfLife', label: 'Shelf Life' },
                  { key: 'weight', label: 'Weight' },
                  { key: 'certification', label: 'Certification' },
                  { key: 'discount', label: 'Discount' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-2 px-4 -mb-px border-b-2 font-medium ${
                      activeTab === key
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-green-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700 leading-relaxed"
            >
              {{
                description: product.description,
                ingredients: product.ingredients,
                usage: product.usage,
                shelfLife: product.shelfLife,
                weight: product.weight,
                certification: product.certification,
                discount: product.discount,
              }[activeTab]}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
