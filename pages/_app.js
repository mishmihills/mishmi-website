import '../styles/default.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/mismi.css';

import { useRouter } from 'next/router';

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY;

  const AppContent = (
    <>
        <Component {...pageProps} />

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
