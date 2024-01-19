"use server";

import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function getCartItems(userId?: string) {
  if (!userId) return null;
  const cartItems = await db.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      food: true,
    },
  });

  return cartItems;
}

export async function addToCart({
  foodId,
  count = 1,
}: {
  foodId: string;
  count?: number;
}) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const existingCart = await db.cartItem.findFirst({
      where: {
        foodId,
        userId: currentUser.id,
      },
    });

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        cartItems: {
          ...(existingCart
            ? {
                update: {
                  where: {
                    id: existingCart.id,
                  },
                  data: {
                    count: existingCart.count + count,
                  },
                },
              }
            : {
                create: {
                  foodId,
                  count,
                },
              }),
        },
      },
    });

    return { success: "Item Added to Cart" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function removeFromCart(foodId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const cartItem = await db.cartItem.findFirst({
      where: {
        foodId,
        userId: currentUser.id,
      },
    });

    if (!cartItem) {
      return { error: "Item does not exist in cart" };
    }

    await db.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return { success: "Item Removed from cart" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
