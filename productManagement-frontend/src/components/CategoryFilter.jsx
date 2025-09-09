import { useProducts } from '../context/ProductContext';
import './CategoryFilter.css';

const CategoryFilter = () => {
  const { categories, selectedCategory, handleCategoryFilter, handleSort, sortBy } = useProducts();

  const categoryIcons = {
    all: '🏪',
    fruits: '🍎',
    vegetables: '🥕',
    sweets: '🍭',
    clothes: '👕',
    machines: '⚙️',
    electronics: '📱',
    books: '📚',
    toys: '🧸',
    sports: '⚽'
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ];

  return (
    <>
    <div className="category-filter">
      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              <span className="category-icon">
                {categoryIcons[category] || '📦'}
              </span>
              <span className="category-name">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
      </div>

      <div className="sort-section">
        <select 
          value={sortBy} 
          onChange={(e) => handleSort(e.target.value)}
          className="sort-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </>
  );
};

export default CategoryFilter;