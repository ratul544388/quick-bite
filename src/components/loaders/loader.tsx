"use client";
import { cn } from "@/lib/utils";
import { PacmanLoader } from "react-spinners";

import PulseSpinner from "react-spinners/PulseLoader";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed z-50 bg-background/30 inset-0 flex items-center justify-center",
        className
      )}
    >
      <PacmanLoader color="#E11D48" className="opacity-80" />
    </div>
  );
};

Loader.Pulse = function PulseLoader() {
  return (
    <div
      className={cn(
        "fixed z-50 bg-background/30 inset-0 flex items-center justify-center"
      )}
    >
      <PulseSpinner color="#E11D48" />
    </div>
  );
};
