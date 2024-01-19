"use client";

import { addToCart } from "@/actions/cart-action";
import { cn } from "@/lib/utils";
import { CartItem, Food } from "@prisma/client";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export type CountAndTotalTypes = {
  count: number;
  total?: number;
};

interface CounterProps {
  value: number;
  onTotalChange?: (value: number) => void;
  onChange: (value: number) => void;
  isSmall?: boolean;
  addInstant?: boolean;
  food: Food;
  total?: number;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  isSmall,
  addInstant,
  food,
}) => {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(1);

  const { mutate } = useMutation({
    mutationFn: async (amount: number) => {
      if (addInstant) {
        return setCount((prev) => prev + amount);
      }
      await addToCart({ foodId: food.id, count: 1 });
    },
    onMutate: async (amount: number) => {
      await queryClient.cancelQueries(["cart"] as InvalidateQueryFilters);
      const prevCartItems = queryClient.getQueryData<CartItem[]>(["cart"]);
      const updatedCartItems = prevCartItems?.map((item) => ({
        ...item,
        ...(item.foodId === food.id
          ? {
              count: item.count + amount,
            }
          : {}),
      }));
      queryClient.setQueryData(["cart"], updatedCartItems);
      onChange(value + amount);
      return { prevCartItems };
    },
  });

  return (
    <div className="flex items-center gap-2 my-2 select-none">
      <Button
        onClick={() => (addInstant ? mutate(-1) : setCount((prev) => prev - 1))}
        variant="outline"
        disabled={count === 1}
        className={cn(
          "h-9 w-9 p-0 rounded-full",
          isSmall && "h-6 w-6 min-h-[24px] min-w-[24px]"
        )}
      >
        <Minus className={cn("h-4 w-4", isSmall && "h-3 w-3")} />
      </Button>
      <h1
        className={cn(
          "font-bold select-none text-lg w-[30px] text-center",
          isSmall && "text-sm font-semibold w-[20px]"
        )}
      >
        {addInstant ? value : count}
      </h1>
      <Button
        onClick={() => (addInstant ? mutate(1) : setCount((prev) => prev + 1))}
        variant="outline"
        className={cn(
          "h-9 w-9 p-0 rounded-full",
          isSmall && "h-6 w-6 min-h-[24px] min-w-[24px]"
        )}
      >
        <Plus className={cn("h-4 w-4", isSmall && "h-3 w-3")} />
      </Button>
    </div>
  );
};

export default Counter;
