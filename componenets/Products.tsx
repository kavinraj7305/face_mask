"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./Products.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  benefits: string;
  image: string;
}

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const router = useRouter();

  const products: Product[] = [
    {
      id: 1,
      name: "Ayurvedic Face Pack",
      category: "face pack",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image:
        "https://i.pinimg.com/736x/4d/00/1c/4d001c84470bce9f13c034a05399eab3.jpg",
    },
    {
      id: 2,
      name: "Turmeric Face Pack",
      category: "face pack",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image:
        "https://i.pinimg.com/474x/be/52/f4/be52f43cf114b93d0013c2f9c64b10ba.jpg",
    },
    {
      id: 3,
      name: "Herbal Face Pack",
      category: "face pack",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image:
        "https://i.pinimg.com/736x/6d/f4/72/6df4720fc4e18483489b8fdff857e08f.jpg",
    },
    {
      id: 4,
      name: "Herbal Ubtan Pack",
      category: "face pack",
      price: "₹500/kg",
      benefits: "Brightens skin, reduces acne",
      image:
        "https://i.pinimg.com/736x/42/27/96/422796a4cf6404e4e365c802aeac0192.jpg",
    },
    {
      id: 5,
      name: "Sandalwood Nalangu Maavu",
      category: "nalangu mavu",
      price: "₹500/kg",
      benefits: "Cooling effect, improves complexion",
      image:
        "https://i.pinimg.com/736x/1f/6f/fe/1f6ffeffb0f0e75f6a368716783c2060.jpg",
    },
    {
      id: 6,
      name: "Herbal Bath Powder",
      category: "bath powder",
      price: "₹500/kg",
      benefits: "Softens skin, natural fragrance",
      image:
        "https://i.pinimg.com/736x/86/c9/4d/86c94ddd04322d22555c766d5d0c6484.jpg",
    },
    {
      id: 7,
      name: "Ayurvedic Bath Powder",
      category: "bath powder",
      price: "₹500/kg",
      benefits: "Softens skin, natural fragrance",
      image:
        "https://i.pinimg.com/736x/28/af/6e/28af6e60961df70f1bcaacaa7eab9b6e.jpg",
    },
    {
      id: 8,
      name: "Herbal Holi Colour Powder",
      category: "holi colors",
      price: "₹500/kg",
      benefits: "Chemical-free, skin-friendly",
      image:
        "https://i.pinimg.com/736x/eb/32/28/eb3228ee69ef5c129e7c85f1f9794e19.jpg",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleProductClick = (id: number) => {
    // Navigate to dynamic product page
    router.push(`/product/${id}`);
  };

  return (
    <section className="herbal-products" id="products">
      <div className="container">
        <div className="section-header">
          <h2>Nature's Healing Powders</h2>
          <p>100% Organic • Traditional Recipes • Handcrafted with Care</p>
        </div>

        <div className="category-nav">
          {[
            "all",
            "face pack",
            "nalangu mavu",
            "bath powder",
            "holi colors",
          ].map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all"
                ? "All Products"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                hoveredProduct === product.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-badge">{product.category}</div>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
                <div className="herbal-particles">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="particle"
                      style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${i * 0.2}s`,
                        backgroundImage: `url('/images/herb-particle-${
                          Math.floor(Math.random() * 3) + 1
                        }.png')`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="benefits">{product.benefits}</p>
                <div className="price-container">
                  <span className="price">{product.price}</span>
                  <button className="add-to-cart">
                    <span className="icon">🛒</span> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
