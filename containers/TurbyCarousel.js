"use client";

import React from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";

export default function TurbyCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold font-sans"
        style={{ color: "var(--txt-clr)" }}
      >
        Get to know your Turby.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Turby 1",
    title: "Turby 1",
    src: "https://gateway.lighthouse.storage/ipfs/bafybeid774thx3nuf7a4afhnw3mezecnusqjcfcwmt63hdlkbt3esktk3a/1.png",
    // content: <DummyContent />,
  },
  {
    category: "Turby 2",
    title: "Turby 2",
    src: "https://gateway.lighthouse.storage/ipfs/bafybeid774thx3nuf7a4afhnw3mezecnusqjcfcwmt63hdlkbt3esktk3a/2.png",
    // content: <DummyContent />,
  },
  {
    category: "Turby 3",
    title: "Turby 3",
    src: "https://gateway.lighthouse.storage/ipfs/bafybeid774thx3nuf7a4afhnw3mezecnusqjcfcwmt63hdlkbt3esktk3a/3.png",
    // content: <DummyContent />,
  },

  {
    category: "Turby 4",
    title: "Turby 4",
    src: "https://gateway.lighthouse.storage/ipfs/bafybeid774thx3nuf7a4afhnw3mezecnusqjcfcwmt63hdlkbt3esktk3a/4.png",
    // content: <DummyContent />,
  },
  {
    category: "Turby 5",
    title: "Turby 5",
    src: "https://gateway.lighthouse.storage/ipfs/bafybeid774thx3nuf7a4afhnw3mezecnusqjcfcwmt63hdlkbt3esktk3a/5.png",
    // content: <DummyContent />,
  },
  {
    category: "Turby 6",
    title: "Turby 6",
    src: "https://gateway.lighthouse.storage/ipfs/bafybeid774thx3nuf7a4afhnw3mezecnusqjcfcwmt63hdlkbt3esktk3a/6.png",
    // content: <DummyContent />,
  },
];
