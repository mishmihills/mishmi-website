import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <h3 className="font-serif fs-4 mb-4">Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="#treks" className="text-white text-decoration-none hover-text-warning">Treks</a></li>
              <li><a href="#accommodations" className="text-white text-decoration-none hover-text-warning">Accommodations</a></li>
              <li><a href="#activities" className="text-white text-decoration-none hover-text-warning">Activities</a></li>
              <li><a href="#events" className="text-white text-decoration-none hover-text-warning">Events</a></li>
              <li><a href="#sustainable-travel" className="text-white text-decoration-none hover-text-warning">Sustainable Travel</a></li>
              <li><a href="#about" className="text-white text-decoration-none hover-text-warning">About Us</a></li>
              <li><a href="#contact" className="text-white text-decoration-none hover-text-warning">Contact</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h3 className="font-serif fs-4 mb-4">Contact Us</h3>
            <p>Email: {process.env.NEXT_PUBLIC_SUPPORTEMAIL}</p>
            <p>Phone: {process.env.NEXT_PUBLIC_PHONE}</p>
            <p>Address: {process.env.NEXT_PUBLIC_RE_ADDRESS}</p>
          </div>
          <div className="col-12 col-md-3">
            <h3 className="font-serif fs-4 mb-4">Follow Us</h3>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Facebook" className="text-white">Facebook</a>
              <a href="#" aria-label="Instagram" className="text-white">Instagram</a>
              <a href="#" aria-label="Twitter" className="text-white">Twitter</a>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <h3 className="font-serif fs-4 mb-4">Our Commitment</h3>
            <p>Mishmi Hills is dedicated to sustainable tourism and preserving the natural beauty of our region.</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-top border-secondary text-center">
          <p>&copy; 2024 Mishmi Hills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
