"use client";

import React, { useEffect, useRef, useState } from "react";

export default function TurbyCarousel() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const data = [
    {
      category: "Pirate Punk",
      title: "The Dapper Rebel",
      src: "/turby/turby_1.jpeg",
    },
    {
      category: "Suave Wave",
      title: "Mustache Maverick",
      src: "/turby/turby_2.jpeg",
    },
    {
      category: "Festive Pride",
      title: "Rainbow Rocket",
      src: "/turby/turby_3.jpeg",
    },
    {
      category: "Beat Blaster",
      title: "Headphone Hero",
      src: "/turby/turby_8.jpeg",
    },
    {
      category: "Royal Rogue",
      title: "Crowned & Dangerous",
      src: "/turby/turby_11.jpeg",
    },
    {
      category: "Battle Ready",
      title: "Armor Ace",
      src: "/turby/turby_6.jpeg",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let scrollTimeout;
    let isProcessingScroll = false;

    const handleWheel = (e) => {
      if (isMobile || isProcessingScroll) return;

      e.preventDefault();
      isProcessingScroll = true;

      if (e.deltaY > 0) {
        // Scrolling down - move to next card
        if (currentCardIndex < data.length - 1) {
          setCurrentCardIndex((prev) => prev + 1);
        } else {
          // Last card reached, move to next section
          moveToNextSection();
        }
      } else {
        // Scrolling up - move to previous card
        if (currentCardIndex > 0) {
          setCurrentCardIndex((prev) => prev - 1);
        } else {
          // First card, move to previous section
          moveToPreviousSection();
        }
      }

      // Debounce scroll events
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isProcessingScroll = false;
      }, 300);
    };

    const moveToNextSection = () => {
      const nextSection = containerRef.current?.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    const moveToPreviousSection = () => {
      const prevSection = containerRef.current?.previousElementSibling;
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Add scroll event listener only for desktop
    const element = containerRef.current;
    if (element && !isMobile) {
      element.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentCardIndex, data.length, isMobile]);

  // Touch drag functionality for mobile only
  const handleTouchStart = (e) => {
    if (!isMobile) return;

    const touch = e.touches[0];
    const startX = touch.pageX - carouselRef.current.offsetLeft;
    const scrollLeft = carouselRef.current.scrollLeft;

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const x = touch.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  // Auto-scroll to current card (desktop only)
  useEffect(() => {
    if (carouselRef.current && currentCardIndex >= 0 && !isMobile) {
      const cardWidth = 240; // w-56 (224px) + gap (16px)
      const scrollPosition = currentCardIndex * cardWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentCardIndex, isMobile]);

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden">
      {/* Carousel container */}
      <div className="w-full flex items-center">
        <div
          ref={carouselRef}
          className="flex w-full overflow-x-auto py-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onTouchStart={handleTouchStart}
        >
          <div className="flex flex-row pl-4">
            {data.map((card, index) => (
              <div
                key={index}
                className={`flex-shrink-0 transition-all duration-500 transform translate-y-8 opacity-0 animate-fade-up ${
                  index === currentCardIndex
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-60"
                }`}
                style={{
                  marginRight:
                    index === data.length - 1
                      ? 0
                      : !isMobile && index === currentCardIndex
                      ? "4rem"
                      : "2rem",
                  animationDelay: `${150 * index}ms`,
                }}
              >
                <div className="relative flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
                  <div className="relative z-40 p-8">
                    <p className="text-left font-sans text-sm font-medium text-white md:text-base">
                      {card.category}
                    </p>
                    <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
                      {card.title}
                    </p>
                  </div>
                  <img
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 z-10 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
