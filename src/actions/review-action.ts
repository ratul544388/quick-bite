"use server";

import * as z from "zod";

import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { ReviewSchema } from "@/schemas";

export async function createReview({
  values,
  foodId,
}: {
  values: z.infer<typeof ReviewSchema>;
  foodId: string;
}) {
  try {
    const validatedFields = ReviewSchema.safeParse(values);

    if (!validatedFields) {
      return { error: "Fields error" };
    }

    if (!foodId) {
      return { error: "Food Id is required" };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthneticated" };
    }

    const food = await db.food.findUnique({
      where: {
        id: foodId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
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

    if (!food) {
      return { error: "Food not found" };
    }

    const isPurchased = currentUser.orders.some(
      (order) =>
        order.orderItems.some((item) => item.foodId === foodId) &&
        (order.status === "DELIVERED" || order.status === "DELIVERY_PENDING")
    );

    if (!isPurchased) {
      return {
        error:
          "You didn't purchase the food yet. Please purchase the food and give your review",
      };
    }

    const newAvgRating =
      (food.avgRating * food.reviews.length + values.star) /
      (food.reviews.length + 1);

    await db.food.update({
      where: {
        id: food.id,
      },
      data: {
        avgRating: newAvgRating,
        reviews: {
          create: {
            ...values,
            userId: currentUser.id,
          },
        },
      },
    });

    return { success: "Review Submitted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateReview({
  values,
  foodId,
  reviewId,
}: {
  values: z.infer<typeof ReviewSchema>;
  foodId: string;
  reviewId: string;
}) {
  try {
    const validatedFields = ReviewSchema.safeParse(values);

    if (!validatedFields) {
      return { error: "Fields error" };
    }

    if (!foodId) {
      return { error: "Food Id is required" };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthneticated" };
    }

    const food = await db.food.findUnique({
      where: {
        id: foodId,
      },
      include: {
        reviews: true,
      },
    });

    if (!food) {
      return { error: "Food not found" };
    }

    const isPurchased = food.reviews.some(
      (review) => review.userId === currentUser.id
    );

    if (!isPurchased) {
      return {
        error:
          "You didn't purchase the food yet. Please purchase the food and give your review",
      };
    }


    
    const oldRating = await db.review
    .findUnique({
      where: {
        id: reviewId,
        foodId: food.id,
      },
    })
    .then((res) => res?.star);
    
    if (!oldRating) {
      return { error: "Your review wasn't found" };
    }
    
    const ratingDifference = values.star - oldRating;
    
    const previousRatingSum = food.avgRating * food.reviews.length;

    const newRatingSum = previousRatingSum + ratingDifference;

    const newAvgRating = newRatingSum / food.reviews.length;

    await db.food.update({
      where: {
        id: food.id,
      },
      data: {
        avgRating: newAvgRating,
        reviews: {
          update: {
            where: {
              id: reviewId,
            },
            data: {
              ...values,
            },
          },
        },
      },
    });

    return { success: "Review Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthneticated" };
    }

    const review = await db.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        food: {
          include: {
            reviews: true,
          },
        },
      },
    });

    if (!review) {
      return { error: "Review not found" };
    }

    const newAvgRating =
      (review.food.avgRating * review.food.reviews.length - review.star) /
        review.food.reviews.length -
      1;

    await db.food.update({
      where: {
        id: review.foodId,
      },
      data: {
        avgRating: newAvgRating,
        reviews: {
          delete: {
            id: reviewId,
          },
        },
      },
    });

    return { success: "Review Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
