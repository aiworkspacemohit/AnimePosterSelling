const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
  toggleWishlist,
  getWishlist,
  updateUserProfile,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/wishlist', protect, getWishlist);
router.put('/wishlist/:productId', protect, toggleWishlist);
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
