import React, { useState } from 'react';

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    licenseNumber: '',
    carNumber: '',
    carType: '',
    carModel: '',
    city: '',
    cabPrice: '',
    mobileNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`driver_${formData.mobileNumber}`, JSON.stringify(formData));
    alert('Driver registered successfully!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Driver Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input type="text" name="driverName" placeholder="Driver Name" value={formData.driverName} onChange={handleChange} required />
        <input type="text" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} required />
        <input type="text" name="carNumber" placeholder="Car Number" value={formData.carNumber} onChange={handleChange} required />
        <input type="text" name="carType" placeholder="Car Type" value={formData.carType} onChange={handleChange} required />
        <input type="text" name="carModel" placeholder="Car Model" value={formData.carModel} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="number" name="cabPrice" placeholder="Cab Price (per day ₹)" value={formData.cabPrice} onChange={handleChange} required />
        <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Set Password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Register Driver</button>
      </form>
    </div>
  );
};

export default DriverRegistration;
