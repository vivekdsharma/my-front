import React, { useState } from 'react';
import '../styles/formStyles.css';

const LoginCab = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [available, setAvailable] = useState(false);
  const [bookings, setBookings] = useState(0);
  const [needHelp, setNeedHelp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <>
          <h2 className="vendor-login-title">Cab Vendor Login</h2>
          <form onSubmit={handleSubmit} className="vendor-login-form">
            <input
              type="email"
              className="vendor-login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="vendor-login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="vendor-login-button">Login</button>
          </form>
        </>
      ) : (
        <div className="vendor-welcome">
          <h2 className="vendor-login-title">Hello, Welcome Back!</h2>
          <p className="vendor-question">🚗 Are you available to work today?</p>
          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Yes, I’m available
          </label>

          <p className="vendor-question mt-4">📅 How many bookings do you want to take today?</p>
          <input
            type="number"
            value={bookings}
            onChange={(e) => setBookings(e.target.value)}
            placeholder="e.g., 5"
            className="vendor-login-input"
          />

          <p className="vendor-question mt-4">🛠️ Do you need help managing bookings?</p>
          <label>
            <input
              type="checkbox"
              checked={needHelp}
              onChange={(e) => setNeedHelp(e.target.checked)}
            />
            Yes, assist me
          </label>
        </div>
      )}
    </div>
  );
};

export default LoginCab;
