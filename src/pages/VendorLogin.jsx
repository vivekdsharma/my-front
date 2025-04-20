import React, { useState } from 'react';
import LoginCab from './LoginCab';
import LoginTour from './LoginTour';
import '../styles/formStyles.css';

const VendorLogin = () => {
  const [role, setRole] = useState(null); // 'cab' or 'tour'

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="vendor-login-container">
      {!role ? (
        <>
          <h2 className="vendor-login-title">Login as:</h2>
          <div className="vendor-role-options">
            <button
              className="vendor-role-button"
              onClick={() => handleRoleSelect('cab')}
            >
              Cab Booking Vendor
            </button>
            <button
              className="vendor-role-button"
              onClick={() => handleRoleSelect('tour')}
            >
              Tour Guide Vendor
            </button>
          </div>
        </>
      ) : role === 'cab' ? (
        <LoginCab />
      ) : (
        <LoginTour />
      )}
    </div>
  );
};

export default VendorLogin;
