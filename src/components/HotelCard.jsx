// HotelCard.jsx
import React from 'react';

const HotelCard = () => {
  return (
    <div className="card">
      {/* <img src="/path/to/hotel.jpg" alt="Hotel" className="card-image" /> */}
      <div className="card-content">
        <h3 className="card-title">Hotel Name</h3>
        <p className="card-rating">Rating: 4.5/5</p>
      </div>
    </div>
  );
};

export default HotelCard;
