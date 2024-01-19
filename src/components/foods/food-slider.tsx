"use client";

import { FoodCard } from "@/components/foods/food-card";
import { FullUser } from "@/types";
import { Food, User } from "@prisma/client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface FoodSliderProps {
  queryKey: string;
  label: string;
  currentUser: FullUser;
  foods: Food[];
}

export const FoodSlider = ({
  label,
  currentUser,
  foods,
}: FoodSliderProps) => {
  return (
    <div className="w-full space-y-2 overflow-hidden p-3 bg-background rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold ml-2">{label}</h3>
      <Swiper
        spaceBetween={2}
        slidesPerView={2}
        modules={[Pagination, Navigation]}
        navigation={true}
        pagination={{ clickable: true }}
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
        {foods.map((food) => (
          <div key={food.id} className="flex items-center">
            <SwiperSlide className="p-1.5">
              <FoodCard
                currentUser={currentUser}
                food={food}
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};
