const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    images: [String],
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Naruto', 'Demon Slayer', 'One Piece', 'Death Note', 'Attack on Titan', 'Wind Breaker', 'Other'],
    },
    tags: [String],
    stock: {
      type: Number,
      required: true,
      default: 100,
    },
    size: {
      type: String,
      enum: ['A4', 'A3', 'A2', 'A1', '12x18', '18x24', '24x36'],
      default: 'A4',
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
