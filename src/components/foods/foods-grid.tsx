"use client";

import Loader from "@/components/loaders/loader";
import { useInfinityFoods } from "@/hooks/use-infinity-foods";
import { Food, User } from "@prisma/client";
import { PulseLoader } from "react-spinners";
import { FoodCard } from "./food-card";
import { FullUser, InitialFoods } from "@/types";

interface FoodsGridProps {
  currentUser: FullUser;
  category?: string;
  q?: string;
  initialFoods: InitialFoods;
  queryKey: string;
}

const FoodsGrid: React.FC<FoodsGridProps> = ({
  initialFoods,
  currentUser,
  category,
  q,
  queryKey,
}) => {
  const { foods, hasNextPage, ref, status, isFetchingNextPage } =
    useInfinityFoods({
      initialFoods,
      category,
      q,
      queryKey,
    });

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return "Error while fetching foods";
  }

  if (foods?.length === 0) {
    return (
      <p className="text-muted-foreground mt-3 mx-auto">No food item found</p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {foods?.map((food) => (
          <FoodCard
            currentUser={currentUser}
            food={food}
            queryKey={queryKey}
            key={food.id}
          />
        ))}
      </div>
      {hasNextPage ? (
        <PulseLoader />
      ) : (
        <p className="text-center text-muted-foreground text-sm">
          No More page food found
        </p>
      )}
      <div ref={ref} />
    </div>
  );
};

export default FoodsGrid;
