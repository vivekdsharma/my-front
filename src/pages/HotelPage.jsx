import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hotel Registered:", formData);
    alert("Hotel registered successfully (Mocked)");

    localStorage.setItem(`hotel_${formData.mobileNumber}`, JSON.stringify(formData));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hotel Registration</h2>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}
      >
        <input type="text" name="hotelName" placeholder="Hotel Name" value={formData.hotelName} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="number" name="totalRooms" placeholder="Total Rooms" value={formData.totalRooms} onChange={handleChange} required />
        <input type="number" name="pricePerRoom" placeholder="Price per Room (₹)" value={formData.pricePerRoom} onChange={handleChange} required />
        <input type="tel" name="mobileNumber" placeholder="Hotel Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Set Password" value={formData.password} onChange={handleChange} required />

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
