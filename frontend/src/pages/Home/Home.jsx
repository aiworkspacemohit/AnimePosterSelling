import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import api from '../../services/api';
import { Truck, Printer, RotateCcw, ShieldCheck, Star } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products', error);
        // Fallback demo products
        setProducts([
          { _id: '1', title: 'NARUTO - SAGE MODE', price: 499, imageUrl: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=800', category: 'Naruto' },
          { _id: '2', title: 'TANJIRO - HINOKAMI', price: 449, imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800', category: 'Demon Slayer' },
          { _id: '3', title: 'LUFFY - GEAR 5', price: 549, imageUrl: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800', category: 'One Piece' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* ── Hero Section ── */}
      <section className="hero-section flex-center">
        <div className="container hero-container">
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ELEVATE YOUR <br /> SPACE WITH MAIN <br /> CHARACTER ENERGY
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Studio-grade anime wall art printed on 300 GSM matte paper.
              From iconic classics to latest drops. Curated collections 
              for every true Nakama. Available in A3 &amp; A2.
            </motion.p>
            <motion.div
              className="hero-btns flex"
              style={{ marginTop: '40px', gap: '15px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/products" className="btn btn-primary">Shop Posters</Link>
              <Link to="/products" className="btn btn-outline">Browse Collection</Link>
            </motion.div>
          </div>

          <div className="hero-images">
            <div className="hero-img-box large">
              <img
                src="/assets/aot1.jpg"
                alt="Featured Anime Poster"
                className="fill-img"
              />
              <div className="tag-badge">NEW DROP</div>
            </div>
            <div className="hero-img-box small">
              <img
                src="/assets/naruto1.jpg"
                alt="Anime Wall Art"
              />
              <div className="tag-badge" style={{ top: 'auto', bottom: '20px', backgroundColor: 'var(--bg-dark)', color: 'var(--accent)' }}>
                <Star size={14} fill="currentColor" /> 4.9
              </div>
            </div>
          </div>
        </div>

        {/* Rotating Seal */}
        <div className="seal-container">
          <svg className="seal-svg" viewBox="0 0 200 200">
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              fill="transparent"
            />
            <text className="seal-text">
              <textPath xlinkHref="#circlePath">
                • AUTHENTIC ANIME ART • LIMITED DROPS • ANIMORA •
              </textPath>
            </text>
          </svg>
          <div className="seal-center">
            SHOP<br />NOW
          </div>
        </div>
      </section>

      {/* ── Category Badges ── */}
      <section className="category-strip container">
        {['Naruto', 'One Piece', 'Demon Slayer', 'Death Note', 'Attack on Titan'].map(cat => (
          <Link key={cat} to={`/products?category=${cat}`} className="category-chip">
            {cat}
          </Link>
        ))}
      </section>

      {/* ── Featured Posters ── */}
      <section className="featured-section container">
        <div className="section-header flex-between">
          <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: 0 }}>
            FEATURED POSTERS
          </h2>
          <Link to="/products" className="btn btn-outline" style={{ borderRadius: '12px' }}>
            View All
          </Link>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p style={{ fontWeight: 800, textTransform: 'uppercase' }}>Loading posters...</p>
          </div>
        ) : (
          <div className="featured-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ── Trust Banner ── */}
      <section className="bottom-bar container" style={{ padding: '40px 0', borderTop: 'var(--border-width) solid #000', marginTop: '60px' }}>
        <div className="trust-strip flex-between">
          <div className="trust-item">
            <span className="trust-icon"><Truck size={24} /></span>
            <div>
              <strong>GOD-SPEED DELIVERY</strong>
              <p>On orders above ₹999</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><Printer size={24} /></span>
            <div>
              <strong>STUDIO QUALITY</strong>
              <p>300 GSM Premium Matte</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><RotateCcw size={24} /></span>
            <div>
              <strong>HIDDEN LEAF RETURNS</strong>
              <p>7-day hassle-free returns</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><ShieldCheck size={24} /></span>
            <div>
              <strong>CHAKRA SECURE</strong>
              <p>100% safe with Razorpay</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
