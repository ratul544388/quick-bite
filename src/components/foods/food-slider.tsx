"use client";

import { FoodType, getFoods } from "@/actions/food-action";
import { FoodCard } from "@/components/foods/food-card";
import { FullUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "../ui/skeleton";

interface FoodSliderProps {
  label: string;
  currentUser: FullUser;
  type?: FoodType;
  queryKey: string[];
  category?: string;
  foodId?: string;
}

export const FoodSlider = ({
  label,
  currentUser,
  type,
  queryKey,
  category,
  foodId,
}: FoodSliderProps) => {
  const { data, isPending } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await getFoods({ type, category, foodId });
      return res;
    },
  });

  if (isPending) {
    return (
      <div className="space-y-3 w-full p-3 rounded-xl dark:bg-gray-950 overflow-hidden border">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <FoodCard.Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 overflow-hidden p-3 dark:bg-gray-950 rounded-xl shadow-lg border">
      <h3 className="text-2xl font-bold ml-2 text-primary">{label}</h3>
      <Swiper
        loop={true}
        spaceBetween={2}
        slidesPerView={2}
        modules={[Pagination, Navigation]}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 5,
          },
          1100: {
            slidesPerView: 6,
          },
        }}
      >
        {data?.map((food) => (
          <div key={food.id} className="flex items-center">
            <SwiperSlide className="p-1.5">
              <FoodCard currentUser={currentUser} food={food} />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};
