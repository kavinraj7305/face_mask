import { useState } from 'react';
import { useRouter } from 'next/router';
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
  // ... other products remain the same
];

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === parseInt(id as string));
  if (!product) return <div className="p-8 text-center text-xl">Product not found</div>;

  return (
    <>
      <Head>
        <title>{product.name} | Ayurvedic Products</title>
        <meta name="description" content={product.description} />
      </Head>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-amber-800 text-white px-6 py-2 rounded-full mb-8 hover:bg-amber-900 transition-colors"
        >
          <span>←</span> Back to Products
        </button>
        
        <motion.div 
          className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl p-6 shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Product Images */}
          <div className="lg:w-1/2">
            <motion.img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <div className="flex gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  src={product.image} 
                  alt={`Thumbnail ${i}`}
                  className="w-16 h-16 rounded border-2 border-transparent hover:border-amber-500 cursor-pointer transition-all"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-6 relative">
              <h1 className="text-3xl font-bold text-amber-900">{product.name}</h1>
              {product.isBestSeller && (
                <span className="absolute top-0 right-0 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Best Seller
                </span>
              )}
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xl ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-300'}`}
                  >
                    {i < product.rating ? '★' : '☆'}
                  </span>
                ))}
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <p className="text-gray-700"><span className="font-semibold text-amber-800">Category:</span> {product.category}</p>
              <p className="text-green-600 font-medium">In Stock (Ships in 1-2 days)</p>
            </div>

            <div className="mb-6">
              <p className="text-2xl font-bold text-amber-700">{product.price}</p>
              {product.discount && (
                <p className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                  {product.discount}
                </p>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8">
              <label className="block text-amber-800 font-medium mb-2">Quantity (kg):</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center hover:bg-amber-200 transition-colors"
                >
                  −
                </button>
                <span className="text-xl w-10 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center hover:bg-amber-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button 
                className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🛒</span> Add to Cart ({quantity} kg)
              </motion.button>
              <motion.button 
                className="flex-1 bg-amber-800 text-white py-3 px-6 rounded-full font-semibold hover:bg-amber-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Product Tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex overflow-x-auto border-b">
            {['description', 'ingredients', 'usage', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-amber-800 border-b-2 border-amber-600' 
                    : 'text-gray-600 hover:text-amber-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">Product Details</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <p><span className="font-semibold">Shelf Life:</span> {product.shelfLife}</p>
                  <p><span className="font-semibold">Available Sizes:</span> {product.weight}</p>
                  <p><span className="font-semibold">Certifications:</span> {product.certification}</p>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">Key Ingredients</h3>
                <p className="text-gray-700 mb-6">{product.ingredients}</p>
                <div>
                  <h4 className="font-bold text-amber-800 mb-3">Ingredient Benefits:</h4>
                  <ul className="space-y-2">
                    <li><span className="font-semibold">Turmeric:</span> Anti-inflammatory, brightens skin</li>
                    <li><span className="font-semibold">Sandalwood:</span> Cooling effect, reduces blemishes</li>
                    <li><span className="font-semibold">Neem:</span> Antibacterial, fights acne</li>
                    <li><span className="font-semibold">Tulsi:</span> Purifies skin, reduces redness</li>
                    <li><span className="font-semibold">Manjistha:</span> Blood purifier, glow enhancer</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">How to Use</h3>
                <p className="text-gray-700 mb-6">{product.usage}</p>
                <div>
                  <h4 className="font-bold text-amber-800 mb-3">Tips for Best Results:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Always do a patch test before first use</li>
                    <li>Apply on clean, slightly damp skin</li>
                    <li>Use in the evening for maximum absorption</li>
                    <li>Follow with a moisturizer after rinsing</li>
                    <li>Store in a cool, dry place</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-6">Customer Reviews</h3>
                <div className="flex items-center gap-6 mb-8">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-2xl font-bold">
                    {product.rating.toFixed(1)} ★
                  </div>
                  <p className="text-gray-700">Based on {product.reviews} reviews</p>
                </div>
                
                {/* Sample Review */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="font-semibold">Priya Sharma</span>
                    <div className="flex text-amber-500">★★★★☆</div>
                    <span className="text-gray-500 text-sm">2 weeks ago</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Amazing results in just 2 weeks!</h4>
                  <p className="text-gray-700">
                    I've been using this face pack twice a week and already see a noticeable 
                    difference in my skin tone. My dark spots have lightened and my skin 
                    feels so soft. The natural fragrance is lovely too!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-amber-900 mb-10">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <motion.div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-amber-900">{relatedProduct.name}</h3>
                    <p className="text-amber-700 font-medium">{relatedProduct.price}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;