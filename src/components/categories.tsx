"use client";

import { categories } from "@/constants";
import { Button, buttonVariants } from "./ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Categories = ({ category }: { category?: string }) => {
  const isActive = (item: string) => {
    if (item === "ALL" && !category) {
      return true;
    }
    return item === category?.toUpperCase();
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {categories.map((item) => (
        <Link
          href={
            item === "ALL" ? `/menu` : `/menu?category=${item.toLowerCase()}`
          }
          key={item}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "relative rounded-lg hover:bg-primary/10"
          )}
        >
          <span
            className={cn(
              "capitalize z-20",
              isActive(item) && "text-white transition-colors duration-500"
            )}
          >
            {item.toLowerCase()}
          </span>
          {isActive(item) && (
            <motion.span
              layoutId="activeCategory"
              className="absolute inset-0 z-10 bg-primary rounded-lg"
            />
          )}
        </Link>
      ))}
    </div>
  );
};
