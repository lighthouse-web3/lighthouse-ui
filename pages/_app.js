import "../styles/globals.scss";
import "../styles/tailwind.css";

// Memory landing page styles, ported from the standalone site. Their class
// selectors were checked against the rest of the site and share no names, and
// the bare element rules are scoped to .memory-page, so nothing here reaches
// the storage pages. Import order matches the original entry point.
import "../containers/MemoryHome/styles/base.css";
import "../containers/MemoryHome/styles/responsive.css";
import "../containers/MemoryHome/styles/refinements.css";
import "../containers/MemoryHome/styles/motion.css";
import "../containers/MemoryHome/styles/foundation.css";
import "../containers/MemoryHome/styles/usecases.css";
import "../containers/MemoryHome/styles/portal.css";
import "../containers/MemoryHome/styles/next-overrides.css";
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
import { NewsBar } from "../containers";

// RainbowKit imports
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { wagmiConfig, chains } from "../utils/wagmi-config";

// Create a client for react-query
const queryClient = new QueryClient();

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
      localStorage?.getItem("lighthouse.storage/store") || "{}",
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
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={darkTheme()}
        >
          <ThemeContext.Provider value={{ theme, setTheme }}>
            {/* <NewsBar /> */}
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} />
            </AnimatePresence>
            <ToastContainer />
          </ThemeContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
