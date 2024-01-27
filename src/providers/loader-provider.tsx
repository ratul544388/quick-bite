"use client";
import { Loader } from "@/components/loaders/loader";
import { useLoadingStore } from "@/hooks/use-loading-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
    <Loader/>
  );
};
