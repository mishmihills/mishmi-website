import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import Link from 'next/link';


const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!isNavOpen);

  return (
    <header className="sticky-top bg-light shadow">
      <div className="container-fluid py-3 d-flex align-items-center justify-content-between">
        <Link href="/" legacyBehavior>
          <a className="d-flex align-items-center text-decoration-none">
            <span className="h4 text-success fw-bold">{process.env.NEXT_PUBLIC_BRANDNAME}</span>
          </a>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="d-none d-md-flex gap-3">
          <Link href="/experience?page=itinerary" passHref legacyBehavior>
            <a className="text-dark text-decoration-none hover:text-muted">Itinerary</a>
          </Link>
          <Link href="/experience?page=locations" passHref legacyBehavior>
            <a className="text-dark text-decoration-none hover:text-muted">Accommodations</a>
          </Link>
          <Link href="/experience?page=events" passHref legacyBehavior>
            <a className="text-dark text-decoration-none hover:text-muted">Events</a>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <a className="text-dark text-decoration-none hover:text-muted">About Us</a>
          </Link>
          <Link href="/contactus" passHref legacyBehavior>
            <a className="text-dark text-decoration-none hover:text-muted">Contact</a>
          </Link>
        </nav>

        <Button className="btn btn-warning text-white">Enquire Now</Button>

        {/* Hamburger menu on mobile */}
        <button className="d-md-none btn btn-link text-dark" onClick={toggleNav}>
          <div className="hamburger-icon">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </button>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div className={`sidebar bg-light ${isNavOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-center py-3">
        <Link href="/" legacyBehavior>
          <a className="d-flex align-items-left text-decoration-none">
            <span className="h4 font-serif text-success fw-bold">{process.env.NEXT_PUBLIC_BRANDNAME}</span>
          </a>
        </Link>
        </div>
        <nav className="d-flex flex-column align-items-start p-3">
          <Link href="/experience?page=itinerary" passHref legacyBehavior>
            <a className="d-block py-2 text-dark text-decoration-none hover:text-muted" onClick={toggleNav}>Itinerary</a>
          </Link>
          <Link href="/experience?page=locations" passHref legacyBehavior>
            <a className="d-block py-2 text-dark text-decoration-none hover:text-muted" onClick={toggleNav}>Accommodations</a>
          </Link>
          <Link href="/experience?page=events" passHref legacyBehavior>
            <a className="d-block py-2 text-dark text-decoration-none hover:text-muted" onClick={toggleNav}>Events</a>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <a className="d-block py-2 text-dark text-decoration-none hover:text-muted" onClick={toggleNav}>About Us</a>
          </Link>
          <Link href="/contactus" passHref legacyBehavior>
            <a className="d-block py-2 text-dark text-decoration-none hover:text-muted" onClick={toggleNav}>Contact</a>
          </Link>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      <div className={`overlay ${isNavOpen ? 'overlay-open' : ''}`} onClick={toggleNav}></div>
    </header>
  );
};

export default Header;
