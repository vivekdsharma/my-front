import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FamousPlacesFinder = () => {
  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const navigate = useNavigate();

  const API_KEY = '868dfcd8498f4623b4cc9a8810e72b1d';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Geocode the input location to get coordinates
      const geocodeResponse = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${API_KEY}`
      );

      if (geocodeResponse.data.features.length === 0) {
        throw new Error('Location not found');
      }

      const { lat, lon, city } = geocodeResponse.data.features[0].properties;
      setCoordinates({ lat, lon });

      // Step 2: Fetch places around these coordinates
      const radius = 5000; // Increased radius to 5km for more results
      const categories = 'commercial,entertainment,catering,accommodation,tourism';
      const limit = 50;

      const placesResponse = await axios.get(
        `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=${limit}&apiKey=${API_KEY}`
      );

      // Step 3: Process the places data to find nearest in the same city
      const processedPlaces = processPlacesData(placesResponse.data.features, city);
      setPlaces(processedPlaces);

    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to process places data and find nearest in the same city
  const processPlacesData = (features, targetCity) => {
    // Filter places in the same city and add distance property if missing
    const cityPlaces = features
      .filter(feature => 
        feature.properties.city?.toLowerCase() === targetCity?.toLowerCase()
      )
      .map(feature => {
        // If distance isn't provided by API, we'll calculate it later
        if (!feature.properties.distance && coordinates) {
          const placeLon = feature.geometry.coordinates[0];
          const placeLat = feature.geometry.coordinates[1];
          feature.properties.distance = calculateDistance(
            coordinates.lat, 
            coordinates.lon,
            placeLat,
            placeLon
          );
        }
        return feature;
      });

    // Sort by distance (nearest first)
    return cityPlaces.sort((a, b) => {
      return (a.properties.distance || 0) - (b.properties.distance || 0);
    });
  };

  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Distance in meters
  };

  const handleLogout = () => {
    // Removed authentication logic: No need to check for 'isLoggedIn' anymore
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Find Nearest Places in {location || 'Your City'}</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a city (e.g., London, UK)"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Find Nearest Places'}
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {coordinates && (
        <div className="coordinates">
          Showing places nearest to center of {location} at {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}
        </div>
      )}

      {loading && <div className="loading">Loading places...</div>}

      <div className="places-list">
        {places.length > 0 ? (
          places.map((place) => (
            <div key={place.properties.place_id} className="place-card">
              <h3>{place.properties.name || 'Unnamed Place'}</h3>
              <div className="place-details">
                <p className="category">
                  <strong>Type:</strong> {place.properties.categories?.join(', ') || 'Not specified'}
                </p>
                <p className="address">
                  <strong>Address:</strong> {place.properties.formatted}
                </p>
                <p className="distance">
                  <strong>Distance:</strong> {(place.properties.distance || 0).toFixed(0)} meters
                </p>
                {place.properties.datasource?.raw?.wikipedia && (
                  <p className="wiki">
                    <strong>Wikipedia:</strong> 
                    <a 
                      href={`https://en.wikipedia.org/wiki/${place.properties.datasource.raw.wikipedia.split(':')[1]}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {place.properties.name}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          !loading && <div className="no-results">No places found in this city</div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .logout-btn {
          padding: 8px 16px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        h1 {
          color: #333;
          margin: 10px 0;
          font-size: 1.8rem;
        }
        
        .input-group {
          display: flex;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        input {
          flex: 1;
          min-width: 200px;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
        }
        
        button[type="submit"] {
          padding: 12px 24px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        button[type="submit"]:hover {
          background-color: #45a049;
        }
        
        button[type="submit"]:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .error {
          color: #d32f2f;
          padding: 15px;
          background-color: #fde0e0;
          border-radius: 4px;
          margin-bottom: 20px;
          border-left: 4px solid #d32f2f;
        }
        
        .loading {
          text-align: center;
          padding: 30px;
          color: #666;
          font-size: 1.2rem;
        }
        
        .coordinates {
          text-align: center;
          color: #666;
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        
        .places-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .place-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .place-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .place-card h3 {
          margin-top: 0;
          color: #2c3e50;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        .place-details {
          margin-top: 10px;
        }
        
        .place-details p {
          margin: 8px 0;
          line-height: 1.5;
        }
        
        .category {
          color: #7f8c8d;
          font-size: 0.9em;
        }
        
        .address {
          color: #34495e;
        }
        
        .distance {
          color: #27ae60;
          font-weight: bold;
        }
        
        .wiki a {
          color: #2980b9;
          text-decoration: none;
        }
        
        .wiki a:hover {
          text-decoration: underline;
        }
        
        .no-results {
          text-align: center;
          padding: 30px;
          color: #7f8c8d;
          font-size: 1.1rem;
          grid-column: 1 / -1;
        }
        
        @media (max-width: 600px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          input {
            border-radius: 4px;
            margin-bottom: 10px;
          }
          
          button[type="submit"] {
            border-radius: 4px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FamousPlacesFinder;
