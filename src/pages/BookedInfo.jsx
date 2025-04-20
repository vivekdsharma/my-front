import React, { useState } from 'react';
import axios from 'axios';

const TripForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    destinationCity: '',
    numberOfDays: '',
    startDate: '',
    includeFlight: false,
    includeHotel: false,
    includeDriver: false,
    includeGuide: false,
    userId: '', // You can set this dynamically based on user login
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.destinationCity || !formData.numberOfDays || !formData.startDate) {
      alert('Please fill in all the required fields');
      return;
    }

    try {
      // Send data to the backend to confirm the trip and send email
      const response = await axios.post('http://localhost:5000/api/trips/confirm', formData, {
        withCredentials: true, // If you're using cookies or session-based authentication
      });

      if (response.status === 201) {
        alert('Trip booked successfully, and email has been sent!');
      }
    } catch (error) {
      console.error("Error while booking the trip", error);
      alert('There was an error booking the trip');
    }
  };

  return (
    <div>
      <h2>Book Your Trip</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Destination City: </label>
          <input
            type="text"
            name="destinationCity"
            value={formData.destinationCity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Number of Days: </label>
          <input
            type="number"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Include Flight: </label>
          <input
            type="checkbox"
            name="includeFlight"
            checked={formData.includeFlight}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Include Hotel: </label>
          <input
            type="checkbox"
            name="includeHotel"
            checked={formData.includeHotel}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Include Driver: </label>
          <input
            type="checkbox"
            name="includeDriver"
            checked={formData.includeDriver}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Include Guide: </label>
          <input
            type="checkbox"
            name="includeGuide"
            checked={formData.includeGuide}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Confirm Trip</button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
