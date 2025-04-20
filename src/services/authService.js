// services/authService.js
const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:5000';

export const login = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uemail: email, upassword: password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    // Save token if needed
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    throw err;
  }
};

// src/services/authService.js


export const signup = async ({ name, email, phone, password }) => {
  const res = await fetch(`${API_BASE}/api/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, phone, password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Signup failed');
  return data;
};


