import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WatchCard from '../components/WatchCard';
import './Pages.css';

const Home = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocalWatches();
  }, []);

  const fetchLocalWatches = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/watches/local');
      setWatches(response.data);
    } catch (error) {
      console.error('Error fetching watches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading watches...</div>;
  }

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Local Edition Watches</h1>
        <p>Discover our collection of quality timepieces for everyday wear</p>
      </div>
      
      <div className="watches-grid">
        {watches.map(watch => (
          <WatchCard key={watch.id} watch={watch} />
        ))}
      </div>
      
      <div className="cta-section">
        <h2>Want to see our premium collection?</h2>
        <p>Register or login to access our exclusive premium watches</p>
      </div>
    </div>
  );
};

export default Home;