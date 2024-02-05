"use client";

import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ReactNode, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useSheet } from "@/hooks/use-sheet-store";

export const Sheet = ({
  open,
  children,
  className,
  side = "left",
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
  side?: "left" | "right"
}) => {
  const animation = useAnimation();
  const { onClose } = useSheet();

  const handleClose = useCallback(() => {
    animation.start("hidden");
    onClose();
  }, [animation, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  useEffect(() => {
    if (open) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [open, animation]);

  return (
    <motion.div
      variants={{
        hidden: {
          display: "none",
          opacity: 0,
          transition: { delay: 0.3 },
        },
        visible: { opacity: 1, display: "block" },
      }}
      onClick={handleClose}
      initial="hidden"
      animate={animation}
      className="bg-neutral-900/20 backdrop-blur-sm fixed inset-0 z-50 py-5 px-6"
    >
      <motion.aside
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: {
            height: 0,
            width: 0,
            borderRadius: "50%",
          },
          visible: {
            height: "100%",
            width: "75vw",
            borderRadius: 0,
          },
        }}
        initial="hidden"
        animate={animation}
        className={cn(
          "fixed bg-background flex flex-col border-r max-w-[400px] top-0 py-5 overflow-hidden",
          side === "left" && "left-0",
          side === "right" && "right-0",
          className,
        )}
      >
        <motion.div
          className="absolute right-1 top-1"
          variants={{
            hidden: { scale: 0 },
            visible: { scale: 1, transition: { delay: 0.4 } },
          }}
          initial="hidden"
          animate={animation}
        >
          <Button onClick={handleClose} variant="ghost" size="icon">
            <X className="h-6 w-6 text-muted-foreground" />
          </Button>
        </motion.div>
        {children}
      </motion.aside>
    </motion.div>
  );
};
