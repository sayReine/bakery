import React from 'react';

interface FilterPanelProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  filter: {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
  };
  onFilterChange: (filter: {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
  }) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  minPrice,
  maxPrice,
  filter,
  onFilterChange,
  onClearFilters,
}) => {
  const handleCategoryChange = (category: string) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter((cat) => cat !== category)
      : [...filter.categories, category];

    onFilterChange({ ...filter, categories: newCategories });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...filter.priceRange];
    newPriceRange[index] = parseFloat(e.target.value);
    onFilterChange({ ...filter, priceRange: newPriceRange as [number, number] });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, minRating: parseInt(e.target.value, 10) });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/3">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* Category Filters */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-black mb-5">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={filter.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={category} className="text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-black mb-5">Price Range</h4>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filter.priceRange[0]}
            onChange={(e) => handlePriceRangeChange(e, 0)}
            className="w-full"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filter.priceRange[1]}
            onChange={(e) => handlePriceRangeChange(e, 1)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span>${filter.priceRange[0]}</span>
          <span>${filter.priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-black mb-5">Minimum Rating</h4>
        <input
          type="number"
          min="0"
          max="5"
          value={filter.minRating}
          onChange={handleRatingChange}
          className="w-full p-2 border border-gray-300 rounded-lg text-black "
        />
      </div>

      {/* Clear Filters Button */}
      <div className="mt-6">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
          onClick={onClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
