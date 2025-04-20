import React, { useState } from 'react';
import '../styles/formStyles.css';

const LoginTour = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [available, setAvailable] = useState(false);
  const [toursToday, setToursToday] = useState('');
  const [languages, setLanguages] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <>
          <h2 className="vendor-login-title">Tour Guide Login</h2>
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
          <h2 className="vendor-login-title">Hey there, Tour Guide!</h2>
          <p className="vendor-question">🌞 Are you available for tours today?</p>
          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Yes, I’m available
          </label>

          <p className="vendor-question mt-4">🏞️ How many tours are you planning to host today?</p>
          <input
            type="number"
            value={toursToday}
            onChange={(e) => setToursToday(e.target.value)}
            placeholder="e.g., 3"
            className="vendor-login-input"
          />

          <p className="vendor-question mt-4">🗣️ Which languages can you guide in today?</p>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="e.g., English, Spanish"
            className="vendor-login-input"
          />
        </div>
      )}
    </div>
  );
};

export default LoginTour;
