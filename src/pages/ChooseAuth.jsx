import React from 'react';
import { Link } from 'react-router-dom';

const ChooseAuth = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Choose how you'd like to login or signup</h2>
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <div>
          <h3>Vendor</h3>
          <Link to="/login/vendor">
            <button style={buttonStyle}>Login as Vendor</button>
          </Link>
          <br /><br />
          <Link to="/signup/vendor">
            <button style={buttonStyle}>Signup as Vendor</button>
          </Link>
        </div>
        <div>
          <h3>Customer</h3>
          <Link to="/login/customer">
            <button style={buttonStyle}>Login as Customer</button>
          </Link>
          <br /><br />
          <Link to="/signup/customer">
            <button style={buttonStyle}>Signup as Customer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#00bcd4',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default ChooseAuth;
