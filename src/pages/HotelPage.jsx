import React, { useState } from 'react';
import axios from 'axios';

const HotelRegistration = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    city: '',
    location: '',
    totalRooms: '',
    pricePerRoom: '',
    mobileNumber: '',
    password: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result  // base64 image string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/hotels/register', formData);
      alert('Hotel registered successfully!');
      console.log("Server response:", res.data);
    } catch (err) {
      console.error('Error registering hotel:', err);
      alert('Hotel registration failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hotel Registration</h2>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}
      >
<input type="text" name="name" placeholder="Hotel Name" value={formData.name} onChange={handleChange} required />
<input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
<input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
<input type="number" name="roomsAvailable" placeholder="Total Rooms" value={formData.roomsAvailable} onChange={handleChange} required />
<input type="number" name="price" placeholder="Price per Room (₹)" value={formData.price} onChange={handleChange} required />
<input type="tel" name="phone" placeholder="Hotel Mobile Number" value={formData.phone} onChange={handleChange} required />


        {/* ✅ Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        {/* Preview */}
        {formData.image && <img src={formData.image} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px' }} />}

        <button type="submit">Register Hotel</button>
      </form>
    </div>
  );
};

export default HotelRegistration;
