import React, { useState } from 'react';

const TouristGuideRegistration = () => {
  const [formData, setFormData] = useState({
    guideName: '',
    city: '',
    languages: '',
    experience: '',
    chargesPerDay: '',
    mobileNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const guidePayload = {
      name: formData.guideName,
      city: formData.city,
      phone: formData.mobileNumber,
      languages: formData.languages.split(',').map(lang => lang.trim()),
      experience: parseInt(formData.experience),
      price: parseFloat(formData.chargesPerDay),
      password: formData.password
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/guides/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(guidePayload)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Guide registered successfully!");
        console.log("Registered Guide:", data.Guide);
      } else {
        alert(data.message || "Registration failed.");
        console.error(data);
      }
  
    } catch (error) {
      console.error("Error registering guide:", error);
      alert("Something went wrong while registering.");
    }
  };
  

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tourist Guide Registration</h2>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}
      >
        <input type="text" name="guideName" placeholder="Full Name" value={formData.guideName} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City/Location" value={formData.city} onChange={handleChange} required />
        <input type="text" name="languages" placeholder="Languages Spoken (comma separated)" value={formData.languages} onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience (in years)" value={formData.experience} onChange={handleChange} required />
        <input type="number" name="chargesPerDay" placeholder="Charges per Day (₹)" value={formData.chargesPerDay} onChange={handleChange} required />
        <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Set Password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Register Guide</button>
      </form>
    </div>
  );
};

export default TouristGuideRegistration;
