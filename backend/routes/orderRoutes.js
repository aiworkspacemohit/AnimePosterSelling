const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  createRazorpayOrder,
  verifyAndPayOrder,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const dbCheck = require('../middleware/dbCheck');

router.post('/', dbCheck, protect, createOrder);
router.post('/razorpay', dbCheck, protect, createRazorpayOrder);
router.get('/my', dbCheck, protect, getMyOrders);
router.get('/', dbCheck, protect, admin, getAllOrders);
router.get('/:id', dbCheck, protect, getOrderById);
router.put('/:id/pay', dbCheck, protect, verifyAndPayOrder);
router.put('/:id/status', dbCheck, protect, admin, updateOrderStatus);

module.exports = router;
