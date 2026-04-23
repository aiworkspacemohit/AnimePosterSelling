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
const dbCheck = require('../middleware/dbCheck');

router.get('/wishlist', dbCheck, protect, getWishlist);
router.put('/wishlist/:productId', dbCheck, protect, toggleWishlist);
router.put('/profile', dbCheck, protect, updateUserProfile);
router.get('/', dbCheck, protect, admin, getAllUsers);
router.get('/:id', dbCheck, protect, admin, getUserById);
router.delete('/:id', dbCheck, protect, admin, deleteUser);

module.exports = router;
