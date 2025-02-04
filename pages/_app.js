import '../styles/responsive.css';
import '../styles/default.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from "../components/common/Loading";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State to track CSS loading

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false); // Hide loader once CSS is loaded
    };

    // Load CSS based on the route
    if (router.pathname !== '/') {
      import('../styles/style.css').then(handleLoad);
      
    } else {
      import('../styles/mismi.css').then(handleLoad);
    }

    // Fallback: Hide loader if CSS doesn't load in time
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set timeout to 3 seconds

    return () => clearTimeout(timeoutId);
  }, [router.pathname]);

  return (
  /*   <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    > */
    <>
      {isLoading ? (
        <Loader /> // Show loader while the CSS is loading
      ) : (
        <Component {...pageProps} />
      )}
    </>
   /*  </GoogleReCaptchaProvider> */
  );
}

export default MyApp;
