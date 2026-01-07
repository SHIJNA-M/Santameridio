import React from 'react';
import './WatchCard.css';

const WatchCard = ({ watch }) => {
  return (
    <div className="watch-card">
      <img src={watch.image} alt={watch.name} className="watch-image" />
      <div className="watch-info">
        <h3 className="watch-name">{watch.name}</h3>
        <p className="watch-description">{watch.description}</p>
        <div className="watch-price">${watch.price}</div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default WatchCard;