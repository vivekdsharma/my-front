import axios from 'axios';
import { useState } from 'react';

const TripPlanner = () => {
  const [tripData, setTripData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    destinationCity: '',
    numberOfDays: 1,
    startDate: '',
    includeFlight: false,
    includeHotel: false,
    includeDriver: false,
    includeGuide: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const planTrip = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  
    // Check if token or userId are missing
    if (!token || !userId) {
      console.error("Missing token or userId in localStorage");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const response = await axios.post(
        'http://localhost:5000/api/trips/preview',
        { ...formData, userId }, // Send userId and formData
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPreview(response.data);
    } catch (error) {
      console.error('Error in trip preview:', error.response ? error.response.data : error);
    }
  };
  
  

  const confirmTrip = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Ensure you have the user ID stored
      const response = await axios.post(
        'http://localhost:5000/api/trips/confirm',
        { ...formData, userId, name: 'User Name' }, // Ensure 'name' is passed as well
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTripData(response.data.trip);
    } catch (error) {
      console.error('Error in trip confirm:', error);
    }
  };
  

  return (
    <div>
      <h2>Plan Your Trip</h2>

      <label>
        Destination City:
        <input
          type="text"
          name="destinationCity"
          value={formData.destinationCity}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Number of Days:
        <input
          type="number"
          name="numberOfDays"
          value={formData.numberOfDays}
          onChange={handleChange}
          min="1"
        />
      </label>
      <br />

      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="includeFlight"
          checked={formData.includeFlight}
          onChange={handleChange}
        />
        Include Flight
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="includeHotel"
          checked={formData.includeHotel}
          onChange={handleChange}
        />
        Include Hotel
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="includeDriver"
          checked={formData.includeDriver}
          onChange={handleChange}
        />
        Include Driver
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="includeGuide"
          checked={formData.includeGuide}
          onChange={handleChange}
        />
        Include Guide
      </label>
      <br />

      <button onClick={planTrip}>Preview Trip</button>

      {preview && (
        <div>
          <h3>Trip Preview</h3>
          <p>Total Cost: ₹{preview.totalCost}</p>
          <ul>
            {preview.details.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button onClick={confirmTrip}>Confirm & Book</button>
        </div>
      )}

      {tripData && (
        <div>
          <h3>Trip Booked!</h3>
          <p>Destination: {tripData.destinationCity}</p>
          <p>Total Cost: ₹{tripData.totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
