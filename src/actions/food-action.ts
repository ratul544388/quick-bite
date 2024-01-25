"use server";
import * as z from "zod";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { FoodSchema } from "@/schemas";

export type FoodType = "POPULAR" | "TOP_RATED";

type GetFoodsType = {
  category?: string;
  cursor?: string;
  limit?: number;
  type?: FoodType;
  q?: string;
  foodId?: string;
};

export async function getInfinityFoods({
  category,
  cursor,
  limit,
  q,
}: GetFoodsType = {}) {
  const take = limit || 10;

  const foods = await db.food.findMany({
    where: {
      ...(category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : {}),
      ...(q
        ? {
            OR: [
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                category: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    take,
    ...(cursor
      ? {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }
      : {}),
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
      cartItems: {
        include: {
          user: true,
        },
      },
    },
  });

  let nextCursor = null;

  if (foods.length === take) {
    nextCursor = foods[take - 1].id;
  }

  return { items: foods, nextCursor };
}

export async function getFoods({
  type,
  foodId,
  category,
  q,
  limit,
}: GetFoodsType) {
  const take = limit || 10;
  const foods = await db.food.findMany({
    where: {
      ...(category
        ? {
            category,
          }
        : {}),
      ...(q
        ? {
            OR: [
              {
                category: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(foodId
        ? {
            id: {
              not: foodId,
            },
          }
        : {}),
    },
    orderBy: {
      ...(type === "POPULAR"
        ? {
            orderItems: {
              _count: "desc",
            },
          }
        : type === "TOP_RATED"
        ? {
            avgRating: "desc",
          }
        : {
            createdAt: "desc",
          }),
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
      cartItems: {
        include: {
          user: true,
        },
      },
    },
    take,
  });

  return foods;
}

export async function createFood(values: z.infer<typeof FoodSchema>) {
  try {
    const validatedFields = FoodSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return { error: "Unauthorized" };
    }

    const slug = values.name.replace(/\s+/g, "-").toLowerCase();

    await db.food.create({
      data: {
        ...values,
        slug,
      },
    });

    return { success: "Food Item Created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateFood({
  values,
  foodId,
}: {
  values: z.infer<typeof FoodSchema>;
  foodId: string;
}) {
  try {
    const validatedFields = FoodSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return { error: "Unauthorized" };
    }

    const slug = values.name.replace(/\s+/g, "-").toLowerCase();

    await db.food.update({
      where: {
        id: foodId,
      },
      data: {
        ...values,
        slug,
      },
    });

    return { success: "Food Item Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteFood(foodId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return { error: "Unauthorized" };
    }

    await db.food.delete({
      where: {
        id: foodId,
      },
    });

    return { success: "Food was Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
