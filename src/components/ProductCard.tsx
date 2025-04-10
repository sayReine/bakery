import React from "react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-400">{product.category}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {i < Math.round(product.rating) ? "⭐" : "☆"}
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>
        <button
          className="bg-blue-500 text-white rounded-xl py-1 px-3 hover:bg-blue-600 transition mt-2"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
