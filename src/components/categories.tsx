"use client";

import { categories } from "@/constants";
import { Button, buttonVariants } from "./ui/button";
import { motion } from "framer-motion";
import { cn, formatText } from "@/lib/utils";
import Link from "next/link";
import { useLoadingStore } from "@/hooks/use-loading-store";

export const Categories = ({ category }: { category?: string }) => {
  const { onLoading, isLoading } = useLoadingStore();
  const isActive = (item: (typeof categories)[number]) => {
    if (item === "all" && !category) {
      return true;
    }
    return item === category;
  };

  const handleClick = (item: typeof categories[number]) => {
    if (item === category) return;
    onLoading();
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {categories.map((item) => (
        <Link
          href={
            item === "all" ? `/menu` : `/menu?category=${item.toLowerCase()}`
          }
          onClick={() => handleClick(item)}
          key={item}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "relative rounded-lg hover:bg-primary/10 border-none",
            isLoading && "pointer-events-none"
          )}
        >
          <span
            className={cn(
              "z-20",
              isActive(item) && "text-white transition-colors duration-500"
            )}
          >
            {formatText(item)}
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
