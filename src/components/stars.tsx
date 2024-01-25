"use client";

import { Fragment } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarsProps {
  rating: number;
  size?: number;
}

export const Stars = ({ rating, size = 16 }: StarsProps) => {
  const renderStar = (index: number) => {
    if (rating >= index + 1) {
      return (
        <FaStar
          className="text-primary"
          style={{ height: `${size}px`, width: `${size}px` }}
        />
      );
    } else if (rating >= index + 0.5) {
      return (
        <FaStarHalfAlt
          className="text-primary"
          style={{ height: `${size}px`, width: `${size}px` }}
        />
      );
    } else {
      return (
        <FaRegStar
          className="text-primary"
          style={{ height: `${size}px`, width: `${size}px` }}
        />
      );
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Fragment key={index}>{renderStar(index)}</Fragment>
      ))}
    </div>
  );
};
