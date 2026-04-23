import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        
        const relRes = await api.get(`/products?category=${data.category}&limit=4`);
        setRelated(relRes.data.products.filter(p => p._id !== data._id));
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p style={{ fontWeight: 800, textTransform: 'uppercase' }}>Summoning Details...</p>
    </div>
  );
  
  if (!product) return <div className="flex-center section">Product not found.</div>;

  return (
    <div className="product-detail-page container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> — <Link to="/products">Shop</Link> — <span>{product.title}</span>
      </div>

      <div className="product-main">
        <div className="product-gallery">
          <img src={product.imageUrl} alt={product.title} className="main-image" />
        </div>

        <div className="product-info-panel">
          <span className="category-tag">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="detail-rating">
            <div className="stars flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating || 4) ? "var(--bg-dark)" : "none"} color="var(--bg-dark)" />
              ))}
            </div>
            <span>(48 REVIEWS)</span>
          </div>

          <div className="detail-price">
            ₹{product.price}
          </div>

          <p className="detail-desc">{product.description || "Premium quality anime poster printed on 300 GSM matte paper. Features vibrant colors and sharp details, perfect for any fan's collection. Built to last and resistant to fading."}</p>

          <div className="detail-actions">
            <div className="action-row">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
              </div>
              
              <button className="btn btn-primary buy-btn" onClick={() => addToCart(product, quantity)}>
                <ShoppingCart size={20} />
                ADD TO CART
              </button>
            </div>
            
            <button className="btn btn-outline" style={{ display: 'flex', gap: '10px' }}>
              <Heart size={18} />
              ADD TO WISHLIST
            </button>
          </div>

          <div className="trust-badges">
             <div className="badge-item">
               <Truck size={24} />
               <span>EXPRESS<br />SHIPPING</span>
             </div>
             <div className="badge-item">
               <ShieldCheck size={24} />
               <span>PREMIUM<br />QUALITY</span>
             </div>
             <div className="badge-item">
               <RotateCcw size={24} />
               <span>EASY<br />RETURNS</span>
             </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-products">
          <h2 className="section-title">RELATED <br /> LEGENDS</h2>
          <div className="featured-grid">
            {related.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
