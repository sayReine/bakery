import React, { useState, useMemo } from "react";
import productsData from "../assets/products.json";
import { Product } from "../types";
import ProductGrid from "./ProductGrid";
import FilterPanel from "./FilterPanel";

const Shop: React.FC = () => {
  const [products] = useState<Product[]>(productsData);

  const prices = products.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [filter, setFilter] = useState({
    categories: [] as string[],
    priceRange: [minPrice, maxPrice] as [number, number],
    minRating: 0,
  });

  const categories = useMemo(() => {
    const allCategories = products.map((product) => product.category);
    return Array.from(new Set(allCategories));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inCategory =
        filter.categories.length === 0 ||
        filter.categories.includes(product.category);
      const inPrice =
        product.price >= filter.priceRange[0] &&
        product.price <= filter.priceRange[1];
      const meetsRating = product.rating >= filter.minRating;
      return inCategory && inPrice && meetsRating;
    });
  }, [products, filter]);

  const clearFilters = () => {
    setFilter({
      categories: [],
      priceRange: [minPrice, maxPrice],
      minRating: 0,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-bold text-black-600 mb-6">
        Shop Our Collection
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <FilterPanel
          categories={categories}
          filter={filter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
        />
        <ProductGrid products={filteredProducts} onAddToCart={() => {}} />
      </div>
    </div>
  );
};

export default Shop;
