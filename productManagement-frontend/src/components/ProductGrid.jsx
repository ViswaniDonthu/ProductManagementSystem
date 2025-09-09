import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ onEditProduct }) => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No products found</h3>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onEdit={onEditProduct}
        />
      ))}
    </div>
  );
};

export default ProductGrid;