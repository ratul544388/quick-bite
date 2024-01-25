"use client";

import { addToCart } from "@/actions/cart-action";
import { FoodSlider } from "@/components/foods/food-slider";
import { Photo } from "@/components/photo";
import { Star } from "@/components/star";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { useOrder } from "@/hooks/use-order";
import { cn } from "@/lib/utils";
import { FullFood, FullUser } from "@/types";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import FoodReviews from "./food-reviews";
import { Stars } from "../stars";

interface FoodInfoProps {
  food: FullFood;
  currentUser: FullUser | null;
}

const FoodInfo: React.FC<FoodInfoProps> = ({ food, currentUser }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { onOpen } = useModal();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { handleOrder, isLoading } = useOrder();

  // const handleOrder = () => {
  //   if (currentUser && (!currentUser.address || !currentUser.phone)) {
  //     onOpen("ADDRESS_MODAL", { user: currentUser });
  //   }
  //   startTransition(() => {
  //     const orderItems = [
  //       {
  //         food,
  //         quantity: count,
  //       },
  //     ];
  //     checkout({ orderItems }).then(({ error, url }) => {
  //       if (error) {
  //         toast.error(error);
  //       } else if (url) {
  //         window.location.assign(url);
  //       }
  //     });
  //   });
  // };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    startTransition(() => {
      addToCart({ foodId: food.id, quantity }).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          queryClient.invalidateQueries(["cart"] as InvalidateQueryFilters);
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  const onOrder = () => {
    if (!currentUser) {
      return onOpen("AUTH_MODAL", { redirectUrl: `/menu/${food.id}` });
    } else if (!currentUser.address || !currentUser.phone) {
      return onOpen("ADDRESS_MODAL");
    }
    handleOrder([{ food, quantity }]);
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
            <Stars rating={food.avgRating} size={24} />
            <p className="text-muted-foreground font-semibold mt-2">
              Total: ${(food.price * quantity).toFixed(2)}
            </p>
            <div className="flex items-center gap-2 my-2 select-none">
              <Button
                onClick={() => setQuantity((prev) => prev - 1)}
                variant="outline"
                disabled={quantity === 1}
                className={cn("h-9 w-9 p-0 rounded-full")}
              >
                <Minus className={cn("h-4 w-4")} />
              </Button>
              <h1
                className={cn(
                  "font-bold select-none text-lg w-[30px] text-center"
                )}
              >
                {quantity}
              </h1>
              <Button
                onClick={() => setQuantity((prev) => prev + 1)}
                variant="outline"
                className={cn("h-9 w-9 p-0 rounded-full")}
              >
                <Plus className={cn("h-4 w-4")} />
              </Button>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={onOrder}
                disabled={isLoading}
                className="shadow-md"
              >
                Order now
              </Button>
              <Button
                variant="outline"
                className="border-[1.5px] border-primary shadow-md"
                onClick={handleAddToCart}
                disabled={isPending}
              >
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
