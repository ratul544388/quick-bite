"use client";
import { useLoadingStore } from "@/hooks/use-loading-store";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export const LoaderProvider = ({ className }: { className?: string }) => {
  const { isLoading, onClose } = useLoadingStore();
  const params = useSearchParams();

  useEffect(() => {
    onClose();
  }, [params, onClose]);

  if (!isLoading) {
    return null;
  }

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
