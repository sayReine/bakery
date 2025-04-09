import React from "react";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

interface FilterPanelProps {
  categories: string[];
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  filter,
  onFilterChange,
  onClearFilters,
}) => {
  const handleCategoryChange = (category: string) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter((c) => c !== category)
      : [...filter.categories, category];

    onFilterChange({ ...filter, categories: newCategories });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPrice = [...filter.priceRange] as [number, number];
    newPrice[index] = parseFloat(e.target.value);
    onFilterChange({ ...filter, priceRange: newPrice });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, minRating: parseFloat(e.target.value) });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-6 w-full md:max-w-sm">
      <h2 className="text-xl font-semibold mb-4">🔎 Filters</h2>

      {/* Category Checkboxes */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filter.categories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range (${filter.priceRange[0]} - ${filter.priceRange[1]})</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            className="w-1/2 border rounded px-2 py-1"
            min={0}
            value={filter.priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <input
            type="number"
            className="w-1/2 border rounded px-2 py-1"
            min={0}
            value={filter.priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>
      </div>

      {/* Rating Dropdown */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Minimum Rating</h3>
        <select
          value={filter.minRating}
          onChange={handleRatingChange}
          className="w-full border rounded px-2 py-1"
        >
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="bg-red-500 text-white rounded-xl py-1 px-4 hover:bg-red-600 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;
