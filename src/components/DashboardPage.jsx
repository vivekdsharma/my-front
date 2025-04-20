// src/pages/DashboardPage.jsx
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Welcome! Choose a service</h2>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/hotel')}>
          🏨 Hotel Booking
        </div>
        <div className="card" onClick={() => navigate('/cab')}>
          🚕 Book a Cab
        </div>
        <div className="card" onClick={() => navigate('/guide')}>
          🧭 Tourist Guide
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
