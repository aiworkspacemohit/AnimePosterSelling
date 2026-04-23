import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProductCard.css';
import { useCart } from '../../context/CartContext';

import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { user, updateProfile } = useAuth();
  const { addToCart } = useCart();
  const { _id, title, price, imageUrl, category } = product;
  const [isWishlisted, setIsWishlisted] = useState(
    user?.wishlist?.some(p => p._id === _id) || false
  );

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to wishlist legends');
      return;
    }
    try {
      const { data } = await api.put(`/users/wishlist/${_id}`);
      const updatedWishlist = data.wishlist;
      // Check if product is in wishlist by id
      const isInWishlist = updatedWishlist.some(p => p._id === _id);
      setIsWishlisted(isInWishlist);
      // Store full wishlist product data
      updateProfile({ wishlist: updatedWishlist });
      toast.success(isInWishlist ? 'Added to collection' : 'Removed from collection');
    } catch (error) {
      toast.error('Wishlist update failed');
    }
  };

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-card-header">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <div className="product-image-container">
        <img src={imageUrl} alt={title} className="product-image" />
        <button 
          className={`wishlist-badge-btn ${isWishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
        >
          <Heart size={16} fill={isWishlisted ? "var(--accent)" : "none"} />
        </button>
      </div>
      
      <div className="product-info">
        <div className="product-category">{category}</div>
        <h3 className="product-title">{title}</h3>
        
        <div className="product-footer">
          <div className="product-price">
            ₹{price}
          </div>
          <button 
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
