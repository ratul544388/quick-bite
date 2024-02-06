"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";

export const ImageSlider = () => {
  const [active, setActive] = useState(1);
  const animation = useAnimation();
  const images = [
    "/images/hero.jpg",
    "/images/hero.jpg",
    "/images/hero.jpg",
    "/images/hero.jpg",
    "/images/hero.jpg",
  ];

  const handleNext = () => {
    if (active === -3) {
      return setActive(0);
    }
    setActive(active - 1);
  };

  const handlePrev = () => {
    setActive(active + 1);
  };

  return (
    <div className="">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ x: `${index * 100}%` }}
          animate={{ x: `${active * 100}%` }}
          transition={{ type: "tween" }}
          className="absolute w-screen inset-x-0 h-[50vh]"
        >
          <Image src={image} alt="Hero" fill className="object-cover" />
          <div className="absolute font-bold text-white text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {index}
          </div>
        </motion.div>
      ))}
      <div className="fixed z-20 left-0 top-1/2 flex items-center justify-between w-full">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
