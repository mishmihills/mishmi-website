import React from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Accommodations = ({ locationsList }) => {
  const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
      return [];
    }
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const getAccomodationPage = (filter) => {
    if (!filter) {
      return '/';
    }

    let name = filter?.name ?? "";


    let id = filter.id || "";

    if (name !== "") {
      let nameurl = name.trim().replace(/\s+/g, '-').toLowerCase();
      return `/accommodation/${nameurl}/${id}`;
    }
    return '/';
  };

  return (
    <section id="accommodations" className="py-5 bg-light">
      <div className="container-fluid px-4">
        <h2 className="display-7 text-left text-success mb-5 mt-2">
          Stay Close to Nature
        </h2>
        {locationsList && locationsList.length > 0 && (<div className="row row-cols-1 row-cols-md-3 g-4">
          {shuffleArray(locationsList).map((location, index) => (
            <div className="col" key={location._id || index}>
              <Card className="shadow-sm border-0">
                {/* Accommodation Image */}
                {location.images?.length > 0 ? (
                  <Image
                    src={location.images[0]}
                    alt={location.name}
                    width={400}
                    height={250}
                    className="w-100 h-48 object-cover"
                  />
                ) : (
                  <Image
                    src="/assets/img/d1.jpg"
                    alt="Placeholder"
                    width={400}
                    height={250}
                    className="w-100 h-48 object-cover"
                  />
                )}

                {/* Accommodation Details */}
                <div className="p-3">
                  {/* Name and Location Type */}
                  <h3 className="h5 d-flex align-items-center justify-content-between">
                    {location.name}
                    <span className="badge bg-success ms-2">
                      {location.locationtype || "Unknown"}
                    </span>
                  </h3>
                  <p className="text-muted">{location.district}, {location.state}</p>

                  {/* Pricing Details */}
                  <div className="mb-3">
                    {location.pricing?.map((priceDetail, idx) => (
                      <p key={idx} className="mb-2">
                        <strong>{priceDetail.roomtype}:</strong> ₹
                        {priceDetail.price} / {priceDetail.capacity}{" "}
                        {priceDetail.capacity > 1 ? "people" : "person"}
                      </p>
                    ))}
                  </div>

                  {/* Eco-friendly Badge */}
                  <div className="d-flex align-items-center mb-3">
                    <Leaf className="w-3 h-3 text-success me-2" />
                    <span className="text-muted">Eco-friendly</span>
                  </div>

                  {/* View Details Button */}
                  {location && 
                  <Link href={getAccomodationPage(location)} legacyBehavior passHref>
                    <a className="btn btn-success w-100">View Location</a>
                  </Link>}

                </div>
              </Card>
            </div>
          ))}
        </div>)}
      </div>
    </section>
  );
};

export default Accommodations;
