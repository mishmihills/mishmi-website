import React from 'react';
import { Button } from "../../components/ui/button";
import { Leaf, MapPin, Tent } from 'lucide-react';

const Sustainable = () => {
  return (
    <section id="sustainable-travel" className="py-5 bg-white">
      <div className="container-fluid px-4">
        <h2 className="display-7 text-left text-success mt-2">Our Commitment to Sustainable Travel</h2>
        <p className="text-left mb-8">At Mishmi Hills, we&apos;re dedicated to protecting the environment and supporting local communities through responsible tourism practices.</p>
        <div className="bg-success bg-opacity-10 p-4 rounded-lg shadow-sm mb-8">
          <h3 className="h4 text-success text-center mb-4">Our Sustainability Pledge</h3>
          <p className="text-center mb-4">In partnership with Encamp Adventures, we invite you to join our mission for responsible tourism. Our pledge focuses on respecting nature, supporting local communities, and leaving no trace.</p>
          <Button className="btn btn-warning text-white hover:bg-warning">Read More</Button>
        </div>
        <div className="container-fluid py-5">
  <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
    <div className="col">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <Leaf className="w-25 h-25 text-success mx-auto mb-3" />
          <h4 className="h5 text-success mb-2">Carbon Offset Initiatives</h4>
          <p>We&apos;ve offset 500 tons of CO2 through local reforestation projects.</p>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <Tent className="w-25 h-25 text-success mx-auto mb-3" />
          <h4 className="h5 text-success mb-2">Plastic-Free Policy</h4>
          <p>We&apos;ve eliminated single-use plastics from all our treks and accommodations.</p>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <MapPin className="w-25 h-25 text-success mx-auto mb-3" />
          <h4 className="h5 text-success mb-2">Local Guides Only</h4>
          <p>100% of our guides are from local communities, supporting the local economy.</p>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Sustainable;
