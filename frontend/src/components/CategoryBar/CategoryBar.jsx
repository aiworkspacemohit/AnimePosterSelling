import React from 'react';
import './CategoryBar.css';

const categories = [
  'Naruto', 'Demon Slayer', 'One Piece', 'Death Note', 'Wind Breaker', 'Attack on Titan', 'Jujutsu Kaisen'
];

const CategoryBar = () => {
  return (
    <div className="category-bar section container">
      <h3 className="section-subtitle">Top Categories</h3>
      <div className="category-scroll">
        {categories.map((cat, idx) => (
          <button key={idx} className="category-item">
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
