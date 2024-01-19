"use client";

import { addToCart } from "@/actions/cart-action";
import { checkout } from "@/actions/checkout-action";
import { FoodSlider } from "@/components/foods/food-slider";
import { Photo } from "@/components/photo";
import { Star } from "@/components/star";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { FullFood, FullUser } from "@/types";
import { Food } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import FoodDescription from "./food-description";
import FoodReviews from "./food-reviews";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

interface FoodInfoProps {
  food: FullFood;
  currentUser: FullUser | null;
  similarFoods: Food[];
}

const FoodInfo: React.FC<FoodInfoProps> = ({
  food,
  currentUser,
  similarFoods,
}) => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const { onOpen } = useModal();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleOrder = () => {
    if (currentUser && (!currentUser.address || !currentUser.phone)) {
      onOpen("ADDRESS_MODAL", { user: currentUser });
    }
    startTransition(() => {
      const orderItems = [
        {
          food,
          quantity: count,
        },
      ];
      checkout({ orderItems }).then(({ error, url }) => {
        if (error) {
          toast.error(error);
        } else if (url) {
          window.location.assign(url);
        }
      });
    });
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    startTransition(() => {
      addToCart({ foodId: food.id, count }).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          queryClient.invalidateQueries(["cart"] as InvalidateQueryFilters);
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-9 gap-x-8 gap-y-14 bg-background p-3 rounded-xl shadow-lg md:max-w-max max-w-[500px]">
        <div className="grid grid-cols-9 gap-6 col-span-9 md:col-span-5">
          <Photo
            photo={food.photo}
            className="col-span-9 lg:col-span-5 max-w-[500px]"
          />
          <div className="flex flex-col gap-2 col-span-9 lg:col-span-4">
            <h1 className="text-lg font-bold">{food.name}</h1>
            <h1 className="font-bold text-lg text-primary select-none">
              ${food.price}
            </h1>
            <Star value={food.avgRating} viewOnly />
            <p className="text-muted-foreground font-semibold">
              Total: ${(food.price * count).toFixed(2)}
            </p>
            <div className="flex items-center gap-2 my-2 select-none">
              <Button
                onClick={() => setCount((prev) => prev - 1)}
                variant="outline"
                disabled={count === 1}
                className={cn("h-9 w-9 p-0 rounded-full")}
              >
                <Minus className={cn("h-4 w-4")} />
              </Button>
              <h1
                className={cn(
                  "font-bold select-none text-lg w-[30px] text-center"
                )}
              >
                {count}
              </h1>
              <Button
                onClick={() => setCount((prev) => prev + 1)}
                variant="outline"
                className={cn("h-9 w-9 p-0 rounded-full")}
              >
                <Plus className={cn("h-4 w-4")} />
              </Button>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleOrder} disabled={isPending}>
                Order now
              </Button>
              <Button onClick={handleAddToCart} disabled={isPending}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-3 col-span-9 md:col-span-4">
          <h3 className="text-2xl font-bold">
            About <span className="text-primary">{food.name}</span>
          </h3>
          <Separator />
          <div dangerouslySetInnerHTML={{ __html: food.description }} />
        </div>
      </div>
      <FoodSlider
        currentUser={currentUser}
        label="Similar cuisines"
        queryKey={["similer-food"]}
      />
      <FoodReviews food={food} currentUser={currentUser} />
    </div>
  );
};

export default FoodInfo;