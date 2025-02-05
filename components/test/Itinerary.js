import React, { useCallback } from "react";
import { Badge } from "../../components/ui/badge";
import { Clock, Users, Mountain, Banknote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Itinerary = ({ itineraryList }) => {

  const getItenaryduration = useCallback((filter) => {
    let totaldays = 0;
    let totalstay = 0;
    totaldays = filter?.tempObj?.length ?? 0;
    filter.tempObj && filter.tempObj.map((stay) => {
      if (stay.accomodationdata.accomodation && stay.accomodationdata.accomodation.length > 0) {
        totalstay = totalstay + 1;
      }
      if (totalstay === totaldays && totalstay !== 0) {
        totalstay = totalstay - 1;
      }

    })

    return `${totaldays} Days & ${totalstay} Nights`
  }
    , [itineraryList]);

  const getItenaryPage = (filter) => {
    if (!filter || !filter.itineraryindex || !filter.itineraryindex[0]) {
      return '/';
    }

    let name = filter?.itineraryindex?.[0]?.commondetails?.trip?.nameite ?? null;
    if (!name) {
      name = filter?.itineraryindex?.[0]?.nameite ?? "";
    }

    let id = filter._id || "";

    if (name !== "") {
      let nameurl = name.trim().replace(/\s+/g, '-').toLowerCase();
      return `/itinerary/${nameurl}/${id}`;
    }
    return '/';
  };

  const getPriceString = (filter) => {
    let total = filter?.itineraryindex?.[0]?.commondetails?.cost?.allinclusive ?? null;
    let typeoftt = filter?.itineraryindex?.[0]?.commondetails?.typeoftrip ?? '';
    if (typeoftt && typeoftt === 'group') {
      total = filter?.itineraryindex?.[0]?.commondetails?.grouptrip?.[0]?.groupprice ?? 0;
    }
    if (total) {
      return total;
    }
  }
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

  return (
    <section id="itinerary" className="py-5 bg-white">
      <div className="container-fluid px-4">
        <h2 className="display-7 text-left text-success mb-5 mt-5">Explore Our Itinerary</h2>
        {itineraryList && itineraryList.length > 0 && (<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {shuffleArray(itineraryList).map((trek, index) => (
            <div key={index} className="col">
              <div className="shadow-sm border-0 p-2">
                <div className="position-relative">
                  <Image
                    src={trek?.itineraryindex?.[0]?.commondetails?.images?.[0] ?? "/assets/img/d1.jpg"}
                    alt={"slider" + index}
                    width={400}
                    height={250}
                    className="w-100 h-48 object-cover" />
                    <Badge className="position-absolute top-0 start-0 m-3 badge bg-primary text-white">
                     {trek.isfeatured && "Featured"}
                  </Badge>
                  <Badge className="position-absolute top-0 end-0 m-3 badge bg-warning text-white">
                    {trek?.itineraryindex?.[0]?.commondetails?.typeoftrip}
                  </Badge>
                </div>
                <div className="card-body">
                  <h5 className="h5 d-flex align-items-center justify-content-between">{trek?.itineraryindex?.[0]?.commondetails?.trip?.nameite ?? ""}</h5>
                  <p className="text-muted">{trek?.itineraryindex?.[0]?.commondetails?.trip?.tripdetails ?? ""}</p>
                </div>
                <div className="card-footer">
                  <ul className="row list-unstyled small">
                    <li className="d-flex align-items-center mb-3 col-6">
                      <Clock className="w-4 h-4 me-2 text-muted" />
                      <span>{getItenaryduration(trek)}</span>
                    </li>
                    <li className="d-flex align-items-center mb-3 col-6">
                      <Users className="w-4 h-4 me-2 text-muted" />
                      <span>
                        {trek?.itineraryindex?.[0]?.commondetails?.typeoftrip === 'group'
                          ? 1
                          : trek?.itineraryindex?.[0]?.commondetails?.noofperson} Pax
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3 col-6">
                      <Banknote className="w-4 h-4 me-2 text-muted" />
                      <span>₹ {getPriceString(trek)} /-</span>
                    </li>
                  </ul>

                  {trek && <Link href={getItenaryPage(trek)}>
                    <a className="btn btn-success w-100">View Itinerary</a>
                  </Link>}

                </div>
              </div>
            </div>
          ))}
        </div>)}
      </div>
    </section>
  );
};

export default Itinerary;
