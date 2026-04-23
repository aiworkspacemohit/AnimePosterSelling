const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const dbCheck = require('../middleware/dbCheck');

router.post('/register', dbCheck, register);
router.post('/login', dbCheck, login);
router.get('/profile', dbCheck, protect, getProfile);
router.put('/profile', dbCheck, protect, updateProfile);

module.exports = router;
