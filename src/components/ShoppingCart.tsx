import React from "react";
import { useCart } from "../contexts/cartContext";

const ShoppingCart: React.FC = () => {
  const { cart, dispatch } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", id, quantity: newQty });
  };

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-500 mt-10">🛒 Your cart is empty.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between bg-white shadow rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-contain rounded-md"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="text-sm text-red-500 hover:underline mt-1"
                onClick={() => handleRemove(item.product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow text-right space-y-2">
        <p className="text-lg">
          Total Items: <span className="font-bold">{totalItems}</span>
        </p>
        <p className="text-xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
