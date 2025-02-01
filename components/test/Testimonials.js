import React from 'react';
import { Card } from "../../components/ui/card";
import { Star } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {

  let dss = [ 
    { name: "Sarah L.", quotex: "An unforgettable journey that respects nature and local culture." },
    { name: "Michael T.", quotex: "The eco-lodges were amazing. Truly felt one with nature." },
    { name: "Priya K.", quotex: "The local guides shared incredible insights about the region." }
  ]

  return (
    <section className="py-5 bg-light">
      <div className="container-fluid px-4">
        <h2 className="display-7 text-left text-success mb-5 mt-2">Traveler Stories</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {dss.map((testimonial, index) => (
            <div className="col" key={index}>
              <Card className="p-4 shadow-sm border-0">
                <div className="d-flex align-items-center mb-4">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-circle me-3" />
                  <div>
                    <h4 className="h5">{testimonial.name}</h4>
                    <div className="d-flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="fst-italic">&quot;{testimonial.quotex}&quot;</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
