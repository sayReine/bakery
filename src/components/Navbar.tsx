import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cartContext";

const Navbar: React.FC = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      
      <Link to="/" className="text-xl font-bold text-blue-600">
  <img src="/logo.png" alt="MyStore Logo" className="h-8 w-auto" />
</Link>
      <Link to="/cart" className="relative text-2xl">
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
