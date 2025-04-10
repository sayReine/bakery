import './App.css';
import React, { useState, useMemo } from "react";

import productsData from "./assets/products.json";
import { Product } from "./types";
import ProductGrid from "./components/ProductGrid";
import FilterPanel from "./components/FilterPanel";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ShoppingCart from "./components/ShoppingCart";

const App: React.FC = () => {
  const [products] = useState<Product[]>(productsData);

  // Get unique categories from the product list
  const allCategories = Array.from(new Set(products.map((p) => p.category)));

  // Filter state
  const [filter, setFilter] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
    minRating: 0,
  });

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inCategory =
        filter.categories.length === 0 || filter.categories.includes(product.category);

      const inPrice =
        product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];

      const meetsRating = product.rating >= filter.minRating;

      return inCategory && inPrice && meetsRating;
    });
  }, [products, filter]);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product.name);
  };

  // Reset filter
  const clearFilters = () => {
    setFilter({
      categories: [],
      priceRange: [0, 1000],
      minRating: 0,
    });
  };

  return (
    

    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🛍️ Product Catalog</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Panel */}
        <FilterPanel
          categories={allCategories}
          filter={filter}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default App;
