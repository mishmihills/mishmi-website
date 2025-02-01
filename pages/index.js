import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/test/Hero';
import Itinerary from '../components/test/Itinerary';
import Testimonials from '../components/test/Testimonials';
import Accommodations from '../components/test/Accommodations';
import Sustainable from '../components/test/Sustainable';





export default function Testpage({ itinerary, locations, events }) {
  return (
    <div class="min-vh-100 bg-light text-dark font-sans">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <Hero/>
      {/* Treks Section */}
      <Itinerary itineraryList={itinerary}/>
      {/* Accommodations Section */}
     <Accommodations locationsList={locations}/>
      
      {/* Sustainable Travel Section */}
      <Sustainable/>
      {/* Testimonials Section */}
      <Testimonials/>
      {/* Footer */}
      <Footer/>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_APIURL;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Accept-Encoding': 'compress',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  };


  try {

    const [itineraryRes, locationsRes, eventsRes] = await Promise.all([
      fetch(`${apiUrl}/itinerary`, { headers }),
      fetch(`${apiUrl}/locations`, { headers }),
      fetch(`${apiUrl}/events`, { headers })
    ]);
  

    if (!itineraryRes.ok || !locationsRes.ok || !eventsRes.ok) {
      console.log('Error fetching data:');
      return { props: { error: 'Failed to load data.' } };
    }
  
    const [itinerary, locations, events] = await Promise.all([
      itineraryRes.json(),
      locationsRes.json(),
      eventsRes.json()
    ]);

    return { props: { itinerary, locations, events } };
  } catch (error) {
    console.log('Error fetching data d', error);
    return { props: { error: 'Failed to load data.' } };
  }
  

}