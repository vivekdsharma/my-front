import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ChooseAuth from "./pages/ChooseAuth.jsx";
import VendorLogin from "./pages/VendorLogin";
import CustomerLogin from "./pages/CustomerLogin";
import VendorSignup from "./pages/VendorSignup";
import CustomerSignup from "./pages/CustomerSignup";
import HotelRegistration from './pages/HotelPage';
import BookedInfo from './pages/BookedInfo.jsx';
import FamousPlacesFinder from './pages/FamousPlacesFinder.jsx';
import LandingPage from './pages/LandingPage.jsx';
import TouristGuide from './pages/TouristGuide';
import DriverPage from './pages/DriverPage';

const App = () => {
  const [tripData, setTripData] = useState(null); // ✅ important

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<ChooseAuth />} />
        <Route path="/login/vendor" element={<VendorLogin />} />
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/signup/vendor" element={<VendorSignup />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />

        {/* LandingPage passes tripData to App via prop */}
        <Route path="/customer-landing" element={<LandingPage setTripData={setTripData} />} />

        {/* BookedInfo uses tripData to render details and possibly show FamousPlacesFinder */}
        <Route path="/booked-info" element={<BookedInfo tripData={tripData} />} />

        {/* Registration */}
        <Route path="/guide" element={<TouristGuide />} />
        <Route path="/hotel" element={<HotelRegistration />} />
        <Route path="/driver" element={<DriverPage />} />
      </Routes>
    </Router>
  );
};

export default App;
