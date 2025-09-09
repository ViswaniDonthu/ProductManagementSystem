// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useProducts } from '../context/ProductContext';
// import './ProductForm.css';

// const ProductForm = ({ product, onClose }) => {
//   const { addProduct, updateProduct } = useProducts();
//   const isEditing = !!product;

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(2, 'Name must be at least 2 characters')
//       .max(100, 'Name must be less than 100 characters')
//       .required('Product name is required'),
//     price: Yup.number()
//       .min(0.01, 'Price must be greater than 0')
//       .max(999999, 'Price must be less than $999,999')
//       .required('Price is required'),
//     description: Yup.string()
//       .min(10, 'Description must be at least 10 characters')
//       .max(500, 'Description must be less than 500 characters')
//       .required('Description is required'),
//     category: Yup.string()
//       .required('Category is required'),
//     image: Yup.string()
//       .url('Please enter a valid URL')
//       .nullable()
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: product?.name || '',
//       price: product?.price || '',
//       description: product?.description || '',
//       category: product?.category || '',
//       image: product?.image || ''
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting, setStatus }) => {
//       try {
//         const result = isEditing 
//           ? await updateProduct(product._id, values)
//           : await addProduct(values);
        
//         if (result.success) {
//           onClose();
//         } else {
//           setStatus(result.message);
//         }
//       } catch (error) {
//         setStatus('An error occurred. Please try again.');
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   });

//   const categories = [
//     'fruits', 'vegetables', 'sweets', 'clothes', 'machines', 
//     'electronics', 'books', 'toys', 'sports', 'other'
//   ];

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="form-header">
//           <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
//           <button onClick={onClose} className="close-btn">✕</button>
//         </div>

//         <form onSubmit={formik.handleSubmit} className="product-form">
//           {formik.status && (
//             <div className="form-error-message">
//               {formik.status}
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="name" className="form-label">Product Name *</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className={`form-input ${formik.touched.name && formik.errors.name ? 'error' : ''}`}
//               placeholder="Enter product name"
//               {...formik.getFieldProps('name')}
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="form-error">{formik.errors.name}</div>
//             )}
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="price" className="form-label">Price ($) *</label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 step="0.01"
//                 min="0"
//                 className={`form-input ${formik.touched.price && formik.errors.price ? 'error' : ''}`}
//                 placeholder="0.00"
//                 {...formik.getFieldProps('price')}
//               />
//               {formik.touched.price && formik.errors.price && (
//                 <div className="form-error">{formik.errors.price}</div>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="category" className="form-label">Category *</label>
//               <select
//                 id="category"
//                 name="category"
//                 className={`form-select ${formik.touched.category && formik.errors.category ? 'error' : ''}`}
//                 {...formik.getFieldProps('category')}
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(cat => (
//                   <option key={cat} value={cat}>
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.category && formik.errors.category && (
//                 <div className="form-error">{formik.errors.category}</div>
//               )}
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="description" className="form-label">Description *</label>
//             <textarea
//               id="description"
//               name="description"
//               className={`form-textarea ${formik.touched.description && formik.errors.description ? 'error' : ''}`}
//               placeholder="Enter product description"
//               rows="4"
//               {...formik.getFieldProps('description')}
//             />
//             {formik.touched.description && formik.errors.description && (
//               <div className="form-error">{formik.errors.description}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="image" className="form-label">Image URL (Optional)</label>
//             <input
//               type="url"
//               id="image"
//               name="image"
//               className={`form-input ${formik.touched.image && formik.errors.image ? 'error' : ''}`}
//               placeholder="https://example.com/image.jpg"
//               {...formik.getFieldProps('image')}
//             />
//             {formik.touched.image && formik.errors.image && (
//               <div className="form-error">{formik.errors.image}</div>
//             )}
//             {formik.values.image && !formik.errors.image && (
//               <div className="image-preview">
//                 <img src={formik.values.image} alt="Preview" />
//               </div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button 
//               type="button" 
//               onClick={onClose}
//               className="btn btn-secondary"
//               disabled={formik.isSubmitting}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="btn btn-primary"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting ? (
//                 <>
//                   <div className="spinner small"></div>
//                   {isEditing ? 'Updating...' : 'Adding...'}
//                 </>
//               ) : (
//                 isEditing ? 'Update Product' : 'Add Product'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;




import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProducts } from '../context/ProductContext';
import { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const isEditing = !!product;
  const [preview, setPreview] = useState(product?.image || '');

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(100).required(),
    price: Yup.number().min(1).max(999999).required(),
    description: Yup.string().min(5).max(500).required(),
    category: Yup.string().required(),
    image: Yup.mixed().nullable()
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      price: product?.price || '',
      description: product?.description || '',
      category: product?.category || '',
      image: null
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            formData.append(key, values[key]);
          }
        });

        const result = isEditing
          ? await updateProduct(product._id, formData)
          : await addProduct(formData);

        if (result.success) {
          onClose();
        } else {
          setStatus(result.message);
        }
      } catch (error) {
        setStatus('An error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const categories = [
    'fruits', 'vegetables', 'sweets', 'clothes', 'machines',
    'electronics', 'books', 'toys', 'sports', 'other'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={formik.handleSubmit} className="product-form" encType="multipart/form-data">
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${formik.touched.name && formik.errors.name ? 'error' : ''}`}
              placeholder="Enter product name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="form-error">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                className={`form-input ${formik.touched.price && formik.errors.price ? 'error' : ''}`}
                placeholder="0.00"
                {...formik.getFieldProps('price')}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="form-error">{formik.errors.price}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select
                id="category"
                name="category"
                className={`form-select ${formik.touched.category && formik.errors.category ? 'error' : ''}`}
                {...formik.getFieldProps('category')}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="form-error">{formik.errors.category}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description *</label>
            <textarea
              id="description"
              name="description"
              className={`form-textarea ${formik.touched.description && formik.errors.description ? 'error' : ''}`}
              placeholder="Enter product description"
              rows="2"
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="form-error">{formik.errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Upload Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                formik.setFieldValue("image", file);
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={formik.isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <>
                  <div className="spinner small"></div>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditing ? 'Update Product' : 'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
