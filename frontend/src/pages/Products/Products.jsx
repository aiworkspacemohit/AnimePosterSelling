import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const categories = ['Naruto', 'One Piece', 'Demon Slayer', 'Death Note', 'Attack on Titan'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('keyword', search);
        if (category) queryParams.append('category', category);
        if (sort) queryParams.append('sort', sort);

        const { data } = await api.get(`/products?${queryParams.toString()}`);
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, category, sort]);

  return (
    <motion.div 
      className="products-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <header className="page-header flex-between">
        <div>
          <h1 className="page-title">BROWSE <br /> POSTERS</h1>
          <p className="page-subtitle">Finding your next masterpiece</p>
        </div>
        
        <div className="search-container">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="filter-bar">
        <div className="filter-group">
          <div className="filter-btn">
            <SlidersHorizontal size={16} />
            Filters
          </div>
          
          <div className="category-chips">
            <button 
              className={`chip ${category === '' ? 'active' : ''}`}
              onClick={() => setCategory('')}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`chip ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-group">
          <span>Sort by:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Latest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
          <ChevronDown size={14} className="select-arrow" />
        </div>
      </div>

      <div className="products-grid-container">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p style={{ fontWeight: 800, textTransform: 'uppercase' }}>Summoning posters...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
             <h2>NO ITEMS FOUND.</h2>
             <p>Try searching for something else or clearing filters.</p>
             <button className="btn btn-outline" onClick={() => {setSearch(''); setCategory('');}}>Clear All</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;
