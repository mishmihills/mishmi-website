import{useEffect,memo} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});


const AccomodationSlider=(props)=>{
const {AOS,base_url,accomodation,checkinouttime,isfoodincluded} = props;

const accomdata = accomodation?.accomodation?.length > 0 ? accomodation.accomodation[0] : '';

const {defaultacapacity,selectedroom} = accomodation; 
const placeholderimage= `/assets/img/iti_slide2.jpg`;

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}
  }, [AOS,$]);

const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 1
                },
                1000:{
                    items: 1
                }}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }}

function convertDecimalTo12HourFormat(decimalTime) {

    var hours = Math.floor(decimalTime);
    var minutes = Math.round((decimalTime - hours) * 60);

    var ampm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    var hoursStr = hours < 10 ? '0' + hours : hours;
    var minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return hoursStr + ':' + minutesStr + ' ' + ampm;}


  return (
          <>
          {
            (accomdata !== "") ? 
           <div style={{maxWidth: '450px'}} className="px-5 py-4 bvxc">
                    <OwlCarousel
                                responsive={responsive}
                                loop={true}
                                responsiveClass={true}
                                nav={true}
                                navText={['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>']}
                                dots={true}
                              >
                              {accomdata && accomdata.images
                                ? accomdata.images.map((image, key) =>
                                    isValidURL(image) ? (
                                      <div className="itinerary__single__contentxx" key={key}>
                                        <Image src={image} alt={`acco-${key}`} layout="fill" objectFit="cover" />
                                        <div className="common__btnx" style={{position: 'absolute',bottom: '10px',left: '10px',height:'37px',width:'auto',padding:'0 10px',background:'yellow',color: 'black'}}>{accomdata?.district ?? ''}</div>
                                      </div>
                                    ) : null
                                  )
                                : (
                                  <div className="itinerary__single__contentxx">
                                    <Image src={placeholderimage} alt="acco" layout="fill" objectFit="cover" />
                                  </div>
                                )
                              }
                   </OwlCarousel>

             <div className="d-flex justify-content-between align-items-center mt-2 mb-4 text-sm font-medium text-muted">
               <div>Check-In {convertDecimalTo12HourFormat((checkinouttime[0]/3600).toFixed(2))}</div>
               <div>Check-Out {convertDecimalTo12HourFormat((checkinouttime[1]/3600).toFixed(2))}</div>
             </div>
             <h3 style={{fontSize: '1.3rem'}} className="text-uppercase font-weight-bold text-lg text-success">{process.env.NEXT_PUBLIC_BRANDNAME} {accomdata.locationtype}</h3>
             <ul style={{paddingLeft:'0px'}} className="my-2">
               <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                 Property type {accomdata.locationtype}.
               </li>
               <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                 Sharing with {defaultacapacity} Person.
               </li>
               <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                {isfoodincluded ? 'Breakfast included in the trip cost.' : 'Breakfast included in the trip cost.'}
               </li>
                <li className="d-flex align-items-center text-sm">
                 <span className="h-2 w-2 bg-success rounded-full cvvvx"></span>
                Carbon Emission Score: {accomdata.carbonval} KG/ perday.
               </li>
             </ul>
           </div>
             :""
             }

            </>
          )

}
export default memo(AccomodationSlider);