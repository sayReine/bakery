import React from "react";
import { useCart } from "../contexts/cartContext"; // import your useCart hook

const ShoppingCart: React.FC = () => {
  const { cart, dispatch } = useCart();

  // Handle removing items from the cart
  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  // Handle changing item quantity
  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.product.id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p>${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="bg-gray-300 p-2 rounded-md"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-300 p-2 rounded-md"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white p-2 rounded-md"
                  onClick={() => handleRemove(item.product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button className="bg-blue-500 text-white p-2 rounded-md">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
