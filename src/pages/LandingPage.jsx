import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ setTripData }) => {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [date, setDate] = useState('');
  const [options, setOptions] = useState({
    hotel: false,
    cab: false,
    guide: false,
    flight: false,
  });

  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTripData({
      city,
      days,
      date,
      preferences: options,
    });

    // Redirect to the BookedInfo page
    navigate('/booked-info'); // Navigate to the BookedInfo page
  };

  return (
    <div className="landing-container p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="form bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Plan Your Trip</h2>

        <div className="form-group mb-4">
          <label className="form-label block mb-1 font-medium">Destination City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-input w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter City"
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label block mb-1 font-medium">Number of Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="form-input w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="form-group mb-6">
          <label className="form-label block mb-1 font-medium">Date of Journey</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Additional Services</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[ 
            { name: 'hotel', label: 'Automatic Hotel Booking' },
            { name: 'cab', label: 'Cab Driver' },
            { name: 'guide', label: 'Tourist Guide' },
            { name: 'flight', label: 'Flight Reservation' },
          ].map((option) => (
            <label
              key={option.name}
              className={`cursor-pointer border p-4 rounded-lg flex items-center gap-2 ${options[option.name] ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
            >
              <input
                type="checkbox"
                name={option.name}
                checked={options[option.name]}
                onChange={handleOptionChange}
                className="form-checkbox"
              />
              {option.label}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-btn w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
          Plan Trip
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
