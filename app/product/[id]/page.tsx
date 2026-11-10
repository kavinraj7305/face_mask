"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeftIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { products, sizeOptions } from "@/lib/products";
import { useCart } from "@/componenets/CartProvider";

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].id);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const { addItem } = useCart();
  const product = products.find((p) => p.id === parseInt(id as string, 10));
  const size = sizeOptions.find((s) => s.id === selectedSize) ?? sizeOptions[0];

  const productImages = [
    product?.image,
    "https://i.pinimg.com/736x/6d/f4/72/6df4720fc4e18483489b8fdff857e08f.jpg",
    "https://i.pinimg.com/736x/42/27/96/422796a4cf6404e4e365c802aeac0192.jpg",
    "https://i.pinimg.com/736x/1f/6f/fe/1f6ffeffb0f0e75f6a368716783c2060.jpg",
  ].filter(Boolean) as string[];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const goBackToProducts = () => {
    router.push("/#products");
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      sizeId: size.id,
      sizeLabel: size.label,
      price: size.price,
      courierNote: size.courierNote,
      quantity,
    });
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  if (!id) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">Loading...</div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-2xl">Product not found</p>
        <button
          type="button"
          onClick={goBackToProducts}
          className="text-green-700 underline"
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white"
    >
      <button
        type="button"
        onClick={goBackToProducts}
        className="mb-6 inline-flex items-center space-x-2 text-green-700 hover:text-green-900 transition-colors"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span>Back to products</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24">
            <motion.div
              className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square mb-4 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isBestSeller && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  BESTSELLER
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <HeartIcon
                  className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
            </motion.div>

            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-600" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2"
        >
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span key={rating}>
                  {product.rating >= rating ? (
                    <SolidStarIcon className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  )}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating}+ ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-green-700 mb-1">₹{size.price}</p>
          <p className="text-sm text-gray-500 mb-6">{size.courierNote} on this size</p>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Choose size</h3>
            <div className="grid grid-cols-2 gap-3">
              {sizeOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setSelectedSize(option.id)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    selectedSize === option.id
                      ? "border-green-700 bg-green-50"
                      : "border-gray-200 hover:border-green-600"
                  }`}
                >
                  <span className="block font-semibold text-gray-900">{option.label}</span>
                  <span className="text-sm text-gray-600">
                    ₹{option.price} {option.courierNote}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
            <p className="text-gray-700">{product.benefits}</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-lg font-medium text-gray-900">Quantity:</h3>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 py-3 px-6 rounded-lg font-medium"
            >
              Buy Now
            </button>
          </div>

          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto pb-1">
              {[
                { key: "description", label: "Description" },
                { key: "ingredients", label: "Ingredients" },
                { key: "usage", label: "How to Use" },
                { key: "details", label: "Details" },
              ].map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-700 leading-relaxed"
            >
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "ingredients" && (
                <p>{product.ingredients}</p>
              )}
              {activeTab === "usage" && <p className="whitespace-pre-line">{product.usage}</p>}
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Weight options</h4>
                    <p>100 g, 250 g, 500 g, and 1 kg. Courier extra on every size.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Shelf life</h4>
                    <p>{product.shelfLife}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Notes</h4>
                    <p>{product.certification}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAddedToCart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>
              Added {quantity} × {size.label} {product.name} to cart
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetail;
