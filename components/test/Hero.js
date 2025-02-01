import React from 'react';
import { Button } from "../../components/ui/button";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Hero = () => {
  const router = useRouter();
  return (
  <section
    className="position-relative bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/2754200/pexels-photo-2754200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      height: '55vh', // Ensure the section has a height
      backgroundSize: 'cover', // Ensure the image covers the entire section
      backgroundPosition: 'center', // Center the background image
      backgroundAttachment: 'fixed', // Optional: Add fixed background scrolling effect
    }}
  >
    <div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white text-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay to increase contrast
      }}
    >
      <h1 className="display-6 mb-4" style={{ opacity: 1 }}>
        Discover the Untouched Wilderness of Mishmi Hills
      </h1>
      <p className="lead mb-4" style={{ opacity: 1 }}>
        Explore sustainable travel through treks, local stays, and cultural activities.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Button
          className="btn"
          style={{ backgroundColor: '#D88C5C', color: 'white', opacity: 1 }}
          onClick={() => {router.push("/experience")}}
        >
          Start Your Journey
        </Button>
        <Link href="#sustainable-travel" legacyBehavior passHref>
          <Button
            variant="outline"
            className="btn-outline-light"
            style={{ color: '#000', borderColor: '#fff', opacity: 1}}
          >
            Learn About Our Sustainability Pledge
          </Button>
        </Link>
      </div>
    </div>
  </section>
)};

export default Hero;
