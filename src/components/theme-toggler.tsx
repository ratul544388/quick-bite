"use client";

import { useTheme } from "next-themes";

import { motion, useAnimation } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const animation = useAnimation();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
      animation.start("light");
    } else {
      animation.start("dark");
      setTheme("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const initial = theme === "dark" ? "dark" : "light";

  return (
    <div
      role="button"
      onClick={handleClick}
      className="h-[24px] w-[48px] overflow-hidden relative dark:bg-neutral-800 bg-neutral-200 rounded-full"
    >
      <motion.span
        variants={{
          light: { left: 3 },
          dark: { left: "calc(100% - 23px)" },
        }}
        initial={initial}
        animate={animation}
        className="absolute z-20 top-1/2 -translate-y-1/2 h-[20px] w-[20px] rounded-full bg-primary"
      />
      <motion.div
        variants={{
          light: { rotate: 0 },
          dark: { rotate: 180 },
        }}
        transition={{
          type: "tween",
        }}
        initial={initial}
        animate={animation}
        className="flex items-center justify-between px-1 h-full"
      >
        <Sun className="h-[15px] w-[15px]" />
        <Moon className="h-[15px] w-[15px] dark:rotate-180" />
      </motion.div>
    </div>
  );
}
