"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CounterProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export const Counter = ({ quantity, onChange }: CounterProps) => {
  return (
    <div className="flex items-center gap-2 my-2 select-none">
      <Button
        onClick={() => onChange(quantity - 1)}
        variant="outline"
        disabled={quantity === 1}
        className={cn("h-9 w-9 p-0 rounded-full")}
      >
        <Minus className={cn("h-4 w-4")} />
      </Button>
      <h1 className={cn("font-bold select-none text-lg w-[30px] text-center")}>
        {quantity}
      </h1>
      <Button
        onClick={() => onChange(quantity + 1)}
        variant="outline"
        className={cn("h-9 w-9 p-0 rounded-full")}
      >
        <Plus className={cn("h-4 w-4")} />
      </Button>
    </div>
  );
};
