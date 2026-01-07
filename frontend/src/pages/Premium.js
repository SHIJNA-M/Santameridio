import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import WatchCard from '../components/WatchCard';
import './Pages.css';

const Premium = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchPremiumWatches();
    } else {
      setError('Please login to access premium watches.');
      setLoading(false);
    }
  }, [token]);

  const fetchPremiumWatches = async () => {
    try {
      // Use axios defaults set by AuthContext, but also explicitly set header as backup
      const response = await axios.get('http://localhost:5001/api/watches/premium', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      setWatches(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching premium watches:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Authentication failed. Please login again.');
      } else {
        setError('Failed to load premium watches. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading premium watches...</div>;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error">{error}</div>
          <button 
            onClick={() => {
              setError('');
              setLoading(true);
              fetchPremiumWatches();
            }}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="hero-section premium">
        <h1>Premium Collection</h1>
        <p>Exclusive luxury timepieces for the discerning collector</p>
      </div>
      
      <div className="watches-grid">
        {watches.map(watch => (
          <WatchCard key={watch.id} watch={watch} />
        ))}
      </div>
    </div>
  );
};

export default Premium;