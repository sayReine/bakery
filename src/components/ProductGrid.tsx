import React, { useMemo, useState } from 'react';
import FilterPanel from './FilterPanel';
import ProductCard from './ProductCard';
import { Product } from '../types';

type FilterState = {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
};

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [filter, setFilter] = useState<FilterState>({
    categories: [],
    priceRange: [minPrice, maxPrice],
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
  }, [filter, products]);

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
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
