import React from 'react';
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Leaf } from 'lucide-react';
import Image from 'next/image';

const Events = () => {
  return (
    <section id="events" className="py-5 bg-light">
      <div className="container-fluid px-4">
        <h2 className="display-7 text-left text-success mb-5 mt-2">Stay Close to Nature</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {[
            {
              name: 'Anini Eco Lodge',
              image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              location: 'Anini, Dibang Valley',
              pricePerNight: 2500
            },
            {
              name: 'Mishmi Hills Homestay',
              image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              location: 'Roing, Lower Dibang Valley',
              pricePerNight: 1800
            },
            {
              name: 'Dibang Jungle Camp',
              image: 'https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              location: 'Near Anini, Dibang Valley',
              pricePerNight: 3000
            }
          ].map((accommodation, index) => (
            <div className="col" key={index}>
              <Card className="shadow-sm border-0">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  width={400}
                  height={250}
                  className="w-100 h-48 object-cover" />
                <div className="p-3">
                  <h3 className="h5">{accommodation.name}</h3>
                  <p className="text-muted">{accommodation.location}</p>
                  <p className="mb-3">₹{accommodation.pricePerNight} per person/night</p>
                  <div className="d-flex align-items-center mb-3">
                    <Leaf className="w-3 h-3 text-success me-2" />
                    <span className="text-muted">Eco-friendly</span>
                  </div>
                  <Button className="btn btn-success w-100">View Details</Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
