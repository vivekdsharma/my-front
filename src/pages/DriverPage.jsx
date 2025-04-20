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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const driverPayload = {
      name: formData.driverName,
      phone: formData.mobileNumber,
      carNumberPlate: formData.carNumber,
      licenseNumber: formData.licenseNumber,
      carModel: formData.carModel,
      carType: formData.carType,
      carPrice: parseFloat(formData.cabPrice),
      city: formData.city
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/drivers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(driverPayload)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Driver registered successfully!");
        console.log("Driver:", data.Driver);
      } else {
        alert(data.message || "Registration failed");
        console.error(data);
      }
  
    } catch (error) {
      console.error("Error registering driver:", error);
      alert("Something went wrong");
    }
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
