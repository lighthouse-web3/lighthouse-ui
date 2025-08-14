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
    <div className="w-full h-full">
      {cards.length > 0 && <Carousel items={cards} />}
    </div>
  );
}

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
