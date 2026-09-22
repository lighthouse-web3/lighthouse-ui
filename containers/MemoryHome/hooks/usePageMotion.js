import { useEffect } from "react";

const clamp = (number, minimum = 0, maximum = 1) =>
  Math.max(minimum, Math.min(maximum, number));

/** Animation-only DOM updates avoid rerendering the entire page on scroll. */
export function usePageMotion(disabled) {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const footer = document.querySelector(".footer-word");
    const nav = document.querySelector(".nav");
    const progressBar = document.querySelector(".scroll-progress");
    const revealElements = document.querySelectorAll(".reveal");
    let frame = null;

    document.body.classList.toggle("js-motion", !disabled);
    document.body.classList.toggle("paused", disabled);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    if (!disabled)
      revealElements.forEach((element) => observer.observe(element));

    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (disabled) video.pause();
      else video.play().catch(() => {}); // Autoplay can be blocked by browser preferences.
    });

    function update() {
      frame = null;
      const maximumScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${maximumScroll > 0 ? window.scrollY / maximumScroll : 0})`;
      nav.classList.toggle("scrolled", window.scrollY > 60);
      if (disabled) return;

      const heroProgress = clamp(window.scrollY / hero.offsetHeight);
      hero.style.setProperty("--hero-shift", `${heroProgress * 95}px`);
      hero.style.setProperty("--copy-shift", `${heroProgress * 42}px`);
      hero.style.setProperty("--hero-opacity", 1 - heroProgress * 0.8);

      const footerTop =
        footer.parentElement.getBoundingClientRect().top + footer.offsetTop;
      footer.style.setProperty(
        "--footer-shift",
        `${clamp((footerTop - window.innerHeight * 0.7) * 0.08, -15, 30)}px`,
      );
    }

    function scheduleUpdate() {
      if (frame === null) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    update();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      document.body.classList.remove("js-motion", "paused");
    };
  }, [disabled]);
}
