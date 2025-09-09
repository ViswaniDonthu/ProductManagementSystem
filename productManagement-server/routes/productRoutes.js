
const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/productController');
const upload = require('../middlewares/multer');

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
