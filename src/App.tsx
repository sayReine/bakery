import './App.css';
import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import productsData from "./assets/products.json";
import { Product } from "./types";
import ProductGrid from "./components/ProductGrid";
import FilterPanel from "./components/FilterPanel";
import Footer from "./components/Footer";
import About from './components/About Us'; // fixed filename
// import Shop from './components/Shop';
import Contact from './components/Contact';
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import { useCart } from "./contexts/cartContext";
import logo from "./assets/logo.png";

const App: React.FC = () => {
  const [products] = useState<Product[]>(productsData);
  const { dispatch, cart } = useCart();

  const allCategories = Array.from(new Set(products.map((p) => p.category)));

  const [filter, setFilter] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
    minRating: 0,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inCategory = filter.categories.length === 0 || filter.categories.includes(product.category);
      const inPrice = product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];
      const meetsRating = product.rating >= filter.minRating;
      return inCategory && inPrice && meetsRating;
    });
  }, [products, filter]);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const clearFilters = () => {
    setFilter({
      categories: [],
      priceRange: [0, 1000],
      minRating: 0,
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-300 to-gray-200">



        {/* Navbar */}
        <nav className="bg-white text-blue-900 p-4 flex justify-between items-center shadow-md">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-500">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <p className='text-black'><span className='text-blue-700'>TECH</span>STYLE</p>
          </Link>

          <div className="flex gap-4">
            <Link
              to="/"
              className="text-lg font-bold hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 transition duration-200"
            >
              🏠 Home
            </Link>
            <Link
              to="/about"
              className="text-lg font-bold hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 transition duration-200"
            >
              About Us
            </Link>
            <Link
              to="/shop"
              className="text-lg font-bold hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 transition duration-200"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="text-lg font-bold hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 transition duration-200"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="relative text-2xl hover:text-blue-700 border-b-2 border-transparent hover:border-blue-500 transition duration-200"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/shop" element={
              <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-10 mt-10 text-pink-600">🛍️ Shop Our Collection</h1>
                <div className="flex flex-col md:flex-row gap-6">
                  <FilterPanel
                    categories={allCategories}
                    filter={filter}
                    onFilterChange={setFilter}
                    onClearFilters={clearFilters}
                  />
                  <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
                </div>
              </div>
            } />

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
