import React, { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom"; // Use Link for navigation

const CartIcon: React.FC = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-6 bg-white p-4 rounded-xl shadow-md w-64">
          <h2 className="font-bold">Cart Preview</h2>
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span>{item.product.name}</span>
                  <span>{item.quantity}</span>
                </div>
              ))}
              <div className="mt-4 flex justify-between">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <Link
                to="/cart"
                className="text-blue-600 mt-4 block text-center"
                onClick={() => setIsOpen(false)} // Close the preview when navigating
              >
                Go to Cart
              </Link>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
