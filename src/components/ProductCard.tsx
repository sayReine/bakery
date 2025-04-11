import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col w-60">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-150 object-cover rounded-xl mb-4"
      />
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-400">{product.category}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {i < Math.round(product.rating) ? '⭐' : '☆'}
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
        </div>
        <button
          className="bg-pink-500 cursor-pointer text-white rounded-xl py-1 px-3 hover:bg-rose-600 transition mt-2"
          onClick={() => onAddToCart(product)} // Use onAddToCart from props
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
