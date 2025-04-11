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
    <div className="relative bg-white rounded-2xl shadow p-4 flex flex-col w-60">
      {/* Pop-up Box */}
      {showPopup && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg shadow-md text-sm animate-bounce">
          ✅ Added to Cart
        </div>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-full object-cover rounded-xl mb-4"
      />
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-400">{product.category}</p>
        <div className="flex items-center gap-2 relative left-5">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {i < Math.round(product.rating) ? '⭐' : '☆'}
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
