"use client";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { Food } from "@prisma/client";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Photo } from "../photo";
import { PulseLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { getFoods } from "@/actions/food-action";
import { useDebounce } from "@/hooks/use-debounce";
import { useLoadingStore } from "@/hooks/use-loading-store";

export const HeaderSearch = () => {
  const { onLoading } = useLoadingStore();
  const params = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const [foods, setFoods] = useState<Food[]>();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const handleGetResults = useCallback(async () => {
    setIsLoading(true);
    try {
      const foods = await getFoods({ q: debouncedValue, limit: 5 });
      setFoods(foods);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedValue]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.get("q") === value) {
      return setIsOpen(false);
    }
    onLoading();
    router.push(`/menu/search?q=${value}`);
    setIsOpen(false);
    inputRef?.current?.blur();
  };

  useEffect(() => {
    if (isOpen && debouncedValue) {
      handleGetResults();
    }
  }, [debouncedValue, isOpen, handleGetResults]);

  const Icon = isOpen ? X : Search;

  return (
    <>
      <Icon
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary"
        )}
      />
      <form
        onSubmit={handleSubmit}
        ref={containerRef}
        className={cn(
          "absolute flex flex-col gap-1 items-center left-1/2 -translate-x-1/2 top-[0px] opacity-0 pointer-events-none transition-all w-[320px] sm:w-[400px]",
          isOpen && "pointer-events-auto top-[80px] opacity-100"
        )}
      >
        <input
          ref={inputRef}
          className="w-full h-10 outline-none rounded-lg ring-2 ring-offset-1 border pl-3 ring-primary"
          placeholder="Search cuisines..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>
          <Search
            className={cn("h-5 w-5 absolute right-2 top-2.5 text-primary")}
          />
        </button>
        <div
          ref={containerRef}
          className={cn(
            "w-full flex flex-col bg-background rounded-xl shadow-lg",
            value && "py-2"
          )}
        >
          <button
            className={cn(
              "flex items-center justify-between gap-3 hover:text-primary hover:bg-primary/5 cursor-pointer text-muted-foreground px-4 py-3",
              !value && "hidden"
            )}
          >
            <div className="flex items-center gap-3">
              <h1 className=" text-sm">Search {value}</h1>
              <Search className="h-4 w-4" />
            </div>
            <PulseLoader
              loading={isLoading}
              color="#E11D48"
              size={8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          {foods?.map((food: Food) => (
            <div
              onClick={() => {
                router.push(`/menu/${food.id}`);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-1.5 hover:bg-primary/5 cursor-pointer"
              key={food.id}
            >
              <Photo photo={food.photo} className="max-w-[40px] rounded-md" />
              <div className="flex flex-col">
                <h1 className="text-sm capitalize font-semibold line-clamp-1">
                  {food.name}
                </h1>
                <h1 className="text-xs text-primary line-clamp-1">
                  ${food.price}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  );
};
