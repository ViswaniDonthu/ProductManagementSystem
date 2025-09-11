import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import './ProductCard.css';
const ProductCard = ({ product, onEdit }) => {
  const { showConfirmDialog } = useProducts();
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = () => {
    showConfirmDialog(product);
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (
    <div className={`product-card fade-in ${isDeleting ? 'fade-out' : ''}`}>
      <div className="product-image-container">
        {product.image && !imageError ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            onError={() => setImageError(true)} />
        ) : (
          <div className="product-image-placeholder">
            <span className="placeholder-icon">📦</span>
          </div>
        )}
        <div className="product-overlay " >
          <button 
          style={{backgroundColor:'white',opacity:'0.8'}}
            onClick={() => onEdit(product)}
            className="btn btn-secondary edit-btn"
            title="Edit product"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="btn btn-danger delete-btn"
            title="Delete product">
            Del
          </button>
        </div>
      </div>
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-category">{product.category}</span>
        </div>
        <p className="product-description" title={product.description}>{product.description}</p>
        <div className="product-footer">
          <div className="product-price">{formatPrice(product.price)}</div>
          <div className="product-meta">
            <span className="product-date">Added {formatDate(product.createdAt)}</span>
            {product.userId?.username && (
              <span className="product-author">by {product.userId.username}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;