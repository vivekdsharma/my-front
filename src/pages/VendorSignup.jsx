import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/formStyles.css'; // Optional for styling

const VendorSignup = () => {
  return (
    <div className="vendor-signup">
      <h2>Vendor Registration</h2>
      <div className="card-container">
        <div className="card">
          <h3>Hotel Registration</h3>
          <p>Register your hotel with us.</p>
          <Link to="/hotel">
            <button>Register</button>
          </Link>
        </div>
        <div className="card">
          <h3>Cab Registration</h3>
          <p>Register your cab or driving service.</p>
          <Link to="/driver">
            <button>Register</button>
          </Link>
        </div>
        <div className="card">
          <h3>Tourist Guide Registration</h3>
          <p>Become a tourist guide and help travelers.</p>
          <Link to="/guide">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
