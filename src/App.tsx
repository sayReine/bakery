import './App.css';
import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import productsData from "./assets/products.json";
import { Product } from "./types";
import ProductGrid from "./components/ProductGrid";
import FilterPanel from "./components/FilterPanel";
import Footer from "./components/Footer";
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
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="bg-pink-800 text-white p-4 flex justify-between">
          <Link to="/" className="text-xl font-bold text-pink-600">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </Link>
          <Link to="/" className="text-lg font-bold">🏠 Home</Link>
          <Link to="/" className="text-lg font-bold">About Us</Link>
          <Link to="/" className="text-lg font-bold">Shop</Link>
          <Link to="/" className="text-lg font-bold">Contact</Link>
          <Link to="/cart" className="relative text-2xl">
            🛒 
            
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div>
                <Home />
                <div className="max-w-6xl mx-auto p-4">
                  <h1 className="text-3xl font-bold mb-10 mt-10">🛍️ Product Catalog</h1>
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
              </div>
            } />

            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </main>

        {/* Footer (always at the bottom) */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
