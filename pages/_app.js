import "../styles/globals.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
} from "../utils/services/Intercom";
import ThemeContext from "../utils/services/Themecontext";
import { themeChanger } from "../utils/services/theme";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 120,
      delay: 0,
      duration: 400,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-center",
    });
    loadIntercom();
    bootIntercom();

    const themeFromLocalStorage = JSON.parse(
      localStorage?.getItem("lighthouse.storage/store") || "{}"
    );
    if (themeFromLocalStorage?.theme) {
      setTheme(themeFromLocalStorage?.theme);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    themeChanger(theme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeContext.Provider>
    </>
  );
}

export default MyApp;
