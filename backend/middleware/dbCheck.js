const mongoose = require('mongoose');

const dbCheck = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database connection unavailable',
      hint: 'Please ensure MONGO_URI environment variable is set'
    });
  }
  next();
};

module.exports = dbCheck;
