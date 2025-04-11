import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs flex flex-col hover:shadow-xl transition-all">
      {/* Pop-up */}
      {showPopup && (
        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-lg shadow-md text-sm animate-bounce z-10">
          ✅ Added to Cart
        </div>
      )}

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover rounded-xl mb-4"
      />

      {/* Info */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-500 font-medium">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-400">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-base">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {i < Math.round(product.rating) ? '⭐' : '☆'}
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white rounded-xl py-2 px-4 mt-2 hover:bg-gray-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
