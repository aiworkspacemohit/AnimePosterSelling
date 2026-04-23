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

router.post('/', protect, createOrder);
router.post('/razorpay', protect, createRazorpayOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, verifyAndPayOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
