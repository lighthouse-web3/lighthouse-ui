import "../styles/globals.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../utils/services/Themecontext";
import { themeChanger } from "../utils/services/theme";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== 'undefined') {
        const AOS = (await import('aos')).default;
        await import('aos/dist/aos.css');
        
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
      }
    };

    initAOS();

    if (typeof window !== 'undefined') {
      const themeFromLocalStorage = JSON.parse(
        localStorage?.getItem("lighthouse.storage/store") || "{}"
      );
      setTheme(themeFromLocalStorage?.theme || "dark");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      themeChanger(theme);
    }
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
