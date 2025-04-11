import React, { useMemo, useState } from 'react';
import FilterPanel from './FilterPanel';
import ProductCard from './ProductCard'; // assume you have this
import { products } from '../assets/products.json'; // Your products data

const ProductGrid: React.FC = () => {
  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [filter, setFilter] = useState({
    categories: [],
    priceRange: [minPrice, maxPrice] as [number, number],
    minRating: 0,
  });

  const clearFilters = () => {
    setFilter({
      categories: [],
      priceRange: [minPrice, maxPrice],
      minRating: 0,
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inCategory =
        filter.categories.length === 0 || filter.categories.includes(product.category);
      const inPriceRange =
        product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];
      const hasMinRating = product.rating >= filter.minRating;

      return inCategory && inPriceRange && hasMinRating;
    });
  }, [filter]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterPanel
        categories={allCategories}
        minPrice={minPrice}
        maxPrice={maxPrice}
        filter={filter}
        onFilterChange={setFilter}
        onClearFilters={clearFilters}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
