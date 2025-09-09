import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import './ConfirmDialog.css';

const ConfirmDialog = () => {
  const { confirmDialog, hideConfirmDialog, deleteProduct } = useProducts();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!confirmDialog.show) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteProduct(confirmDialog.product._id);
      if (result.success) {
        // Add fade-out animation to the product card
        const productCard = document.querySelector(`[data-product-id="${confirmDialog.product._id}"]`);
        if (productCard) {
          productCard.classList.add('fade-out');
        }
        
        setTimeout(() => {
          hideConfirmDialog();
        }, 300);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      hideConfirmDialog();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">
          <span>⚠️</span>
        </div>
        
        <div className="confirm-content">
          <h3>Delete Product</h3>
          <p>
            Are you sure you want to delete <strong>"{confirmDialog.product?.name}"</strong>?
          </p>
          <p className="confirm-warning">
            This action cannot be undone.
          </p>
        </div>
        
        <div className="confirm-actions">
          <button 
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="btn btn-danger"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                {/* <div className="spinner small"></div> */}
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;