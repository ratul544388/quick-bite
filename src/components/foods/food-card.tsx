"use client";

import { Photo } from "@/components/photo";
import { Button, buttonVariants } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { FullUser } from "@/types";
import { Food } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stars } from "../stars";
import { Skeleton } from "../ui/skeleton";

interface FoodCardProps {
  food: Food;
  currentUser: FullUser;
  className?: string;
}

export const FoodCard = ({ food, currentUser, className }: FoodCardProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const handleOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!currentUser) {
      return onOpen("AUTH_MODAL");
    } else if (!currentUser.phone || !currentUser.address) {
      return onOpen("ADDRESS_MODAL");
    } else {
      onOpen("ORDER_MODAL", {
        food,
      });
    }
  };

  return (
    <Link
      href={`/menu/${food.slug}`}
      onClick={() => router.push(`/menu/${food.id}`)}
      className={cn(
        "bg-background text-sm shadow-md rounded-xl overflow-hidden flex flex-col gap-2 pb-2 border",
        className
      )}
    >
      <Photo photo={food.photo} className="min-w-full" />
      <div className="flex flex-col px-3 gap-1">
        <h1 className="font-semibold capitalize mt-1 line-clamp-1">
          {food.name}
        </h1>
        <Stars rating={food.avgRating} />
        <h4 className="font-bold text-base text-primary">${food.price}</h4>
        <Button
          onClick={handleOrder}
          className={cn(buttonVariants(), "mt-2 w-full")}
        >
          Order now
        </Button>
      </div>
    </Link>
  );
};

FoodCard.Skeleton = function FoodCardSkeleton() {
  return (
    <div className="min-w-[175px]">
      <Skeleton className="w-full aspect-[6/5]" />
      <div className="p-3 flex flex-col gap-1.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="w-full h-9 mt-1" />
      </div>
    </div>
  );
};
