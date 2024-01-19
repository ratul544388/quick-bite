import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

import { getFoods } from "@/actions/food-action";
import FoodInfo from "@/components/foods/food-info";

const Page = async ({ params }: { params: { food_id: string } }) => {
  const food = await db.food.findUnique({
    where: {
      id: params.food_id,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
        take: 10,
      },
      orderItems: {
        include: {
          order: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
  const currentUser = await getCurrentUser();

  if (!food) {
    notFound();
  }

  const similarFoods = await getFoods({ category: food.category });

  return (
    <FoodInfo
      food={food}
      currentUser={currentUser}
      similarFoods={similarFoods}
    />
  );
};

export default Page;
