import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/test/Hero";
import Itinerary from "../components/test/Itinerary";
import Testimonials from "../components/test/Testimonials";
import Accommodations from "../components/test/Accommodations";
import Sustainable from "../components/test/Sustainable";

export default function Index({ itinerary, locations, events, error }) {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.warn("Error detected:", error);
      // Optional: Retry after 3 seconds
      const retry = setTimeout(() => {
        router.replace(router.asPath);
      }, 3000);
      return () => clearTimeout(retry);
    }
  }, [error, router]);

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-dark">
        <Header />
        <h1>Error Loading Data</h1>
        <p>{error}</p>
        <p>Retrying in 3 seconds...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light text-dark">
      <Header />
      <Hero />
      <Itinerary itineraryList={itinerary} />
      <Accommodations locationsList={locations} />
      <Sustainable />
      <Testimonials />
      <Footer />
    </div>
  );
}


export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_APIURL;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  // Validate environment variables
  if (!apiUrl || !token) {
    console.error("Environment variables are missing.");
    return { props: { itinerary: [], locations: [], events: [], error: "Server configuration error: Missing API URL or Token." } };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Accept-Encoding": "compress",
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  try {
    const [itineraryRes, locationsRes, eventsRes] = await Promise.all([
      fetch(`${apiUrl}/itinerary`, { headers }),
      fetch(`${apiUrl}/locations`, { headers }),
      fetch(`${apiUrl}/events`, { headers }),
    ]);

    // Handle fetch failures
    if (!itineraryRes.ok || !locationsRes.ok || !eventsRes.ok) {
      console.error("Error fetching data:", {
        itineraryStatus: itineraryRes.status,
        locationsStatus: locationsRes.status,
        eventsStatus: eventsRes.status,
      });
      return { props: { itinerary: [], locations: [], events: [], error: "Failed to fetch data from server." } };
    }

    const [itinerary, locations, events] = await Promise.all([
      itineraryRes.json(),
      locationsRes.json(),
      eventsRes.json(),
    ]);

    return { props: { itinerary, locations, events, error: null } };
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return { props: { itinerary: [], locations: [], events: [], error: "An unexpected error occurred." } };
  }
}
