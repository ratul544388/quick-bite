"use client";

import { useInfinityFoods } from "@/hooks/use-infinity-foods";
import { FullUser, InitialFoods } from "@/types";
import { PulseLoader } from "react-spinners";
import { FoodCard } from "./food-card";

interface FoodsGridProps {
  currentUser: FullUser;
  category?: string;
  q?: string;
  initialFoods: InitialFoods;
  afterSignInUrl?: string;
}

export const FoodsGrid: React.FC<FoodsGridProps> = ({
  afterSignInUrl,
  initialFoods,
  currentUser,
  category,
  q,
}) => {
  const queryKey = ["menu", category as string, q as string];
  const { foods, hasNextPage, ref, status, isRefetching } = useInfinityFoods({
    initialFoods,
    category,
    q,
    queryKey,
  });

  if (status === "pending") {
    return (
      <div className="flex items-center gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <FoodCard.Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return "Error while fetching foods";
  }

  if (foods?.length === 0) {
    return (
      <p className="text-muted-foreground mt-3 text-center">
        No food items found
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 xs:gap-5">
        {foods?.map((food) => (
          <FoodCard
            key={food.id}
            currentUser={currentUser}
            food={food}
            afterSignInUrl={afterSignInUrl}
          />
        ))}
      </div>
      {hasNextPage ? (
        <PulseLoader />
      ) : (
        <p className="text-center text-muted-foreground text-sm">
          No More food found
        </p>
      )}
      <div ref={ref} />
    </div>
  );
};
