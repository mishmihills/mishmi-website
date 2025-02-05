import '../styles/default.css';
import '../styles/style.css';
import '../styles/responsive.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from "../components/common/Loading";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const reCaptchaKey = process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY;

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Dynamically load the CSS based on the route
    if (router.pathname !== '/') {
     // import('../styles/style.css').then(handleLoad);
    } else {
      import('../styles/mismi.css').then(handleLoad);
    }

    // Fallback timeout to ensure the loader hides even if CSS doesn't load
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [router.pathname]);

  const AppContent = (
    <>
      {isLoading ? (
        <Loader /> // Show loader while the CSS is loading
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );

  return reCaptchaKey ? (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {AppContent}
    </GoogleReCaptchaProvider>
  ) : (
    AppContent
  );
}

export default MyApp;
