"use client";

import { addToCart, removeFromCart } from "@/actions/cart-action";
import { Photo } from "@/components/photo";
import { Star } from "@/components/star";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FullUser } from "@/types";
import { Food, User } from "@prisma/client";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { BsCart, BsFillCartCheckFill } from "react-icons/bs";
import { Skeleton } from "../ui/skeleton";

interface FoodCardProps {
  food: Food;
  currentUser: FullUser;
  queryKey: string[];
  className?: string;
}

export const FoodCard = ({
  food,
  currentUser,
  queryKey,
  className,
}: FoodCardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const isAddedInCart = currentUser?.cartItems.some(
    (item) => item.foodId === food.id
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    startTransition(() => {
      addToCart({ foodId: food.id }).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          queryClient.invalidateQueries([
            ...queryKey,
            "cart",
          ] as InvalidateQueryFilters);
          router.refresh();
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    startTransition(() => {
      removeFromCart(food.id).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          queryClient.invalidateQueries([
            ...queryKey,
            "cart",
          ] as InvalidateQueryFilters);
          router.refresh();
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  return (
    <Link
      href={`/menu/${food.id}`}
      onClick={() => router.push(`/menu/${food.id}`)}
      className={cn(
        "bg-background text-sm shadow-md rounded-xl overflow-hidden flex flex-col gap-2 pb-2 border",
        className
      )}
    >
      <Photo photo={food.photo} className="min-w-full" />
      <div className="flex flex-col px-3">
        <h1 className="font-semibold capitalize mt-1 line-clamp-2 h-10">
          {food.name}
        </h1>
        <Star value={food.avgRating} size={24} viewOnly />
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-base text-primary">${food.price}</h1>
          <Button
            onClick={(e) =>
              isAddedInCart ? handleRemoveFromCart(e) : handleAddToCart(e)
            }
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="boder-[1.5px] hover:text-primary"
          >
            {isAddedInCart ? (
              <BsFillCartCheckFill className="h-4 w-4 text-primary" />
            ) : (
              <BsCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
};

FoodCard.Skeleton = function FoodCardSkeleton() {
  return (
    <div className="min-w-[175px]">
      <Skeleton className="w-full aspect-[6/5]" />
      <div className="p-3 space-y-1.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
