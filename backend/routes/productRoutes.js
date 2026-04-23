const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const dbCheck = require('../middleware/dbCheck');

router.get('/featured', dbCheck, getFeaturedProducts);
router.get('/', dbCheck, getProducts);
router.get('/:id', dbCheck, getProductById);
router.post('/', dbCheck, protect, admin, createProduct);
router.put('/:id', dbCheck, protect, admin, updateProduct);
router.delete('/:id', dbCheck, protect, admin, deleteProduct);
router.post('/:id/review', dbCheck, protect, addReview);

module.exports = router;
