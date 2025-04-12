import './App.css';
import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import productsData from "./assets/products.json";
import { Product } from "./types";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import About from './components/About Us';
import Contact from './components/Contact';
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import { useCart } from "./contexts/cartContext";
import logo from "./assets/logo.png";

const App: React.FC = () => {
  const [products] = useState<Product[]>(productsData);
  const { dispatch, cart } = useCart();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-teal-900 via-teal-600 to-teal-400 text-white">

        {/* Navbar - same */}
        <nav className="bg-white text-teal-900 p-4 flex justify-between items-center shadow-md">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-teal-500">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <p className='text-black'><span className='text-teal-700'>TECH</span>STYLE</p>
          </Link>

          <div className="flex gap-4">
            <Link to="/" className="text-lg font-bold hover:text-blue-700">🏠 Home</Link>
            <Link to="/about" className="text-lg font-bold hover:text-blue-700">About Us</Link>
            <Link to="/shop" className="text-lg font-bold hover:text-blue-700">Shop</Link>
            <Link to="/contact" className="text-lg font-bold hover:text-blue-700">Contact</Link>
            <Link to="/cart" className="relative text-2xl hover:text-blue-700">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>


        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/shop"
              element={
                <div className="max-w-6xl mx-auto p-4">
                  <h1 className="text-3xl font-bold mb-10 mt-10 text-white-600">
                    🛍️ Shop Our Collection
                  </h1>
                  <ProductGrid
                    products={products}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              }
            />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;