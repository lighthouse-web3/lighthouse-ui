import "../styles/globals.scss";
import "../styles/tailwind.css";

// Memory site styles, from the design team's standalone project. The order is
// that project's own entry point (app/globals.css), which is not alphabetical
// and matters: later files refine earlier ones. Bare element and html/body
// rules are scoped to pages that render .memory-page, and the class names were
// checked against the rest of the site, so nothing here reaches the storage
// pages. After a new design drop, re-run scripts/scope-memory-css.mjs.
import "../containers/MemoryHome/host-reset.css";
import "../containers/MemoryHome/styles/fonts.css";
import "lenis/dist/lenis.css";
import "../containers/MemoryHome/styles/footer.css";
import "../containers/MemoryHome/styles/token-depth.css";
import "../containers/MemoryHome/styles/token-cinema.css";
import "../containers/MemoryHome/styles/token-editorial.css";
import "../containers/MemoryHome/styles/token-service.css";
import "../containers/MemoryHome/styles/token-refined.css";
import "../containers/MemoryHome/styles/usecase-experience.css";
import "../containers/MemoryHome/styles/faq.css";
import "../containers/MemoryHome/styles/builders.css";
import "../containers/MemoryHome/styles/base.css";
import "../containers/MemoryHome/styles/responsive.css";
import "../containers/MemoryHome/styles/refinements.css";
import "../containers/MemoryHome/styles/motion.css";
import "../containers/MemoryHome/styles/foundation.css";
import "../containers/MemoryHome/styles/usecases.css";
import "../containers/MemoryHome/styles/portal.css";
import "../containers/MemoryHome/styles/investors.css";
import "../containers/MemoryHome/styles/token-founders.css";
import "../containers/MemoryHome/styles/link-arrows.css";
import "../containers/MemoryHome/styles/agent-selector.css";
// Local changes on top of the drop. Last, so it wins.
import "../containers/MemoryHome/site-overrides.css";
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
