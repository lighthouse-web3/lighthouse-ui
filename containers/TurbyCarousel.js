"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";

export default function TurbyCarousel() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = data.map((card, index) => (
      <Card key={card.src} card={card} index={index} />
    ));
    setCards(newCards);
  }, []);

  return (
    <div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold font-sans"
        style={{ color: "var(--txt-clr)" }}
      >
        Get to know your Turby.
      </h2>
      {cards.length > 0 && <Carousel items={cards} />}
    </div>
  );
}

const data = [
  {
    category: "Turby 1",
    title: "Turby 1",
    src: "/turby/turby_1.jpeg",
    // content: <DummyContent />,
  },
  {
    category: "Turby 2",
    title: "Turby 2",
    src: "/turby/turby_2.jpeg",
    // content: <DummyContent />,
  },
  {
    category: "Turby 3",
    title: "Turby 3",
    src: "/turby/turby_3.jpeg",
    // content: <DummyContent />,
  },

  {
    category: "Turby 4",
    title: "Turby 4",
    src: "/turby/turby_8.jpeg",
    // content: <DummyContent />,
  },
  {
    category: "Turby 5",
    title: "Turby 5",
    src: "/turby/turby_11.jpeg",
    // content: <DummyContent />,
  },
  {
    category: "Turby 6",
    title: "Turby 6",
    src: "/turby/turby_6.jpeg",
    // content: <DummyContent />,
  },
];
