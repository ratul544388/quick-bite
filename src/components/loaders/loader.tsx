"use client";
import { cn } from "@/lib/utils";
import { PacmanLoader } from "react-spinners";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed z-50 bg-background/30 inset-0 flex items-center justify-center",
        className
      )}
    >
      <PacmanLoader color="#E11D48" />
    </div>
  );
};

export default Loader;
