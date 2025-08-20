import "../styles/globals.scss";
import "../styles/tailwind.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../utils/services/Themecontext";
import { themeChanger } from "../utils/services/theme";
import { AnimatePresence } from "motion/react";

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
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
        <ToastContainer />
      </ThemeContext.Provider>
    </>
  );
}

export default MyApp;
