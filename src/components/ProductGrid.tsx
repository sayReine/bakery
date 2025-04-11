import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [filter, setFilter] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
    minRating: 0,
  });

  const allCategories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inCategory = filter.categories.length === 0 || filter.categories.includes(product.category);
      const inPrice = product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];
      const meetsRating = product.rating >= filter.minRating;
      return inCategory && inPrice && meetsRating;
    });
  }, [products, filter]);

  const clearFilters = () => {
    setFilter({
      categories: [],
      priceRange: [0, 1000],
      minRating: 0,
    });
  };

  return (
    <div className="flex flex-col p-10">
      {/* Only render FilterPanel once */}
      <div className="mb-6">
        <FilterPanel
          categories={allCategories}
          filter={filter}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
