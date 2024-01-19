import { addToCart, removeFromCart } from "@/actions/cart-action";
import { cn } from "@/lib/utils";
import { FullCart } from "@/types";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Equal, Minus, Plus, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import Counter from "../counter";
import { Photo } from "../photo";
import { Button } from "../ui/button";
import { CartItem } from "@prisma/client";

interface CartItemProps {
  cartItem: FullCart;
}

export const SingleCart = ({ cartItem }: CartItemProps) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (amount: number) => {
      await addToCart({ foodId: cartItem.foodId, count: amount });
    },
    onMutate: async (amount: number) => {
      await queryClient.cancelQueries(["cart"] as InvalidateQueryFilters);
      const prevCartItems = queryClient.getQueryData<CartItem[]>(["cart"]);
      const updatedCartItems = prevCartItems?.map((item) => ({
        ...item,
        ...(item.foodId === cartItem.foodId
          ? {
              count: item.count + amount,
            }
          : {}),
      }));
      queryClient.setQueryData(["cart"], updatedCartItems);
      return { prevCartItems };
    },
  });

  const handleRemoveFromCart = () => {
    startTransition(() => {
      removeFromCart(cartItem.foodId).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          queryClient.invalidateQueries(["cart"] as InvalidateQueryFilters);
          router.refresh();
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  return (
    <div className="flex py-2 px-4 hover:bg-primary/5 select-none gap-3 text-sm">
      <Photo photo={cartItem.food.photo} className="max-w-[100px]" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-3">
          <h1
            onClick={() => router.push(`/menu/${cartItem.foodId}`)}
            className="font-semibold hover:underline cursor-pointer capitalize line-clamp-1"
          >
            {cartItem.food.name}
          </h1>
          <Trash
            onClick={handleRemoveFromCart}
            className={cn(
              "min-h-[20px] min-w-[20px] h-5 w-5 text-muted-foreground hover:text-primary",
              isPending && "pointer-events-none opacity-60"
            )}
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          ${cartItem.food.price}
          <X className="h-3 w-3" />
          {cartItem.count}
          <Equal className="h-3 w-3" />
          <p className="text-primary">
            ${(cartItem.count * cartItem.food.price).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2 my-2 select-none">
          <Button
            onClick={() => mutate(-1)}
            variant="outline"
            disabled={cartItem.count === 1}
            className={cn("h-9 w-9 p-0 rounded-full")}
          >
            <Minus className={cn("h-4 w-4")} />
          </Button>
          <h1
            className={cn("font-bold select-none text-lg w-[30px] text-center")}
          >
            {cartItem.count}
          </h1>
          <Button
            onClick={() => mutate(1)}
            variant="outline"
            className={cn("h-9 w-9 p-0 rounded-full")}
          >
            <Plus className={cn("h-4 w-4")} />
          </Button>
        </div>
      </div>
    </div>
  );
};
