import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">WanderWise</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#faqs">FAQs</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-buttons">
          <Link to="/auth"><button className="btn-outline">Login</button></Link>
          <Link to="/auth"><button className="btn-filled">Sign Up</button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>TRAVEL <span>WITH US</span></h1>
          <p>
            Explore the world like never before. Whether you're a solo traveler,
            a couple, or a family on vacation — WanderWise offers personalized
            guidance and expert tips to make your journey unforgettable.
          </p>
          <p>Your next adventure starts here.</p>
          <div className="cta-group">

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About WanderWise</h2>
        <p>
          WanderWise is your smart travel companion — designed to make trip planning
          effortless and exciting. We help you explore the world your way, with
          everything you need in one place.
        </p>
        <h4>✈ What We Offer:</h4>
        <ul className="styled-list">
          <li>🏨 Hotels that fit your budget</li>
          <li>🚗 Reliable car rentals</li>
          <li>🧑‍🤝‍🧑 Local guides and activities</li>
        </ul>
        <h4>💡 Why Wander With Us?</h4>
        <ul className="styled-list">
          <li>Instant results with just your destination & travel dates</li>
          <li>Trusted partners and real traveler reviews</li>
          <li>24/7 support and up-to-date travel info</li>
          <li>Designed for ease, efficiency, and inspiration</li>
        </ul>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="section">
        <h2>FAQs</h2>
        <div className="faq-item">
          <strong>Q:</strong> How does WanderWise work?<br />
          <strong>A:</strong> Just enter your destination and travel dates — we’ll show you the best hotels, rentals, and guides instantly.
        </div>
        <div className="faq-item">
          <strong>Q:</strong> Is it free to use WanderWise?<br />
          <strong>A:</strong> Yes! It’s completely free. We may earn a commission if you book through our partners.
        </div>
        <div className="faq-item">
          <strong>Q:</strong> Are the local guides verified?<br />
          <strong>A:</strong> Absolutely. Every guide is vetted and reviewed by travelers.
        </div>
        <div className="faq-item">
          <strong>Q:</strong> Can I book last-minute travel?<br />
          <strong>A:</strong> Yes! WanderWise supports real-time availability for hotels, rentals, and guides.
        </div>
        <div className="faq-item">
          <strong>Q:</strong> Can I trust the listings?<br />
          <strong>A:</strong> Definitely. We show only verified and reviewed listings from trusted platforms.
        </div>
        <div className="faq-item">
          <strong>Q:</strong> Is support available during my trip?<br />
          <strong>A:</strong> Yes, our 24/7 support is always ready to help you before, during, or after your trip.
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:wanderwise@traveller.com">wanderwise@traveller.com</a></p>
      </section>
    </div>
  );
};

export default Welcome;
