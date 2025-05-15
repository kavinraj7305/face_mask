'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { StarIcon, ChevronLeftIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

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
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAddedToCart, setShowAddedToCart] = useState(false);
  
    const product = products.find((p) => p.id === parseInt(id as string));
  
    // Sample product images for gallery (using same image multiple times as example)
    const productImages = [
      product?.image,
      "https://i.pinimg.com/736x/6d/f4/72/6df4720fc4e18483489b8fdff857e08f.jpg",
      "https://i.pinimg.com/736x/42/27/96/422796a4cf6404e4e365c802aeac0192.jpg",
      "https://i.pinimg.com/736x/1f/6f/fe/1f6ffeffb0f0e75f6a368716783c2060.jpg"
    ].filter(Boolean);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [id]);
  
    const handleAddToCart = () => {
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 3000);
    };
  
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white"
        >
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center space-x-2 text-green-700 hover:text-green-900 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>Back to products</span>
          </button>
  
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-4">
                <motion.div 
                  className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square mb-4 shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
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
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <HeartIcon className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </motion.div>
                
                {/* Thumbnail gallery */}
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-green-600' : 'border-transparent'}`}
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
  
            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
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
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-3xl font-bold text-green-700 mb-6">{product.price}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {product.benefits.split(', ').map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
  
              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-lg font-medium text-gray-900">Quantity:</h3>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    aria-label="Decrease quantity"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 py-3 px-6 rounded-lg font-medium transition-colors">
                  Buy Now
                </button>
              </div>
  
              {/* Tabs */}
              <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-8 overflow-x-auto pb-1 scrollbar-hide">
                  {[
                    { key: 'description', label: 'Description' },
                    { key: 'ingredients', label: 'Ingredients' },
                    { key: 'usage', label: 'How to Use' },
                    { key: 'details', label: 'Details' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                        activeTab === key
                          ? 'border-green-600 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
              </div>
  
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-700 leading-relaxed"
                >
                  {activeTab === 'description' && (
                    <div>
                      <p className="mb-4">{product.description}</p>
                      {product.discount && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                          <p className="font-medium text-green-700">Special Offer: {product.discount}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'ingredients' && (
                    <div>
                      <h4 className="font-medium mb-2">Key Ingredients:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.ingredients.split(', ').map((ingredient, i) => (
                          <div key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2"></span>
                            <span>{ingredient}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'usage' && (
                    <div>
                      <h4 className="font-medium mb-2">Directions:</h4>
                      <p className="whitespace-pre-line">{product.usage}</p>
                    </div>
                  )}
                  
                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Weight Options:</h4>
                        <p>{product.weight}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Shelf Life:</h4>
                        <p>{product.shelfLife}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Certifications:</h4>
                        <p>{product.certification}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
  
          {/* Added to cart notification */}
          <AnimatePresence>
            {showAddedToCart && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Added {quantity} {product.name} to cart</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </>
    );
  };
  
  export default ProductDetail;
