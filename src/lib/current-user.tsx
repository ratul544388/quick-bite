import { auth } from "@clerk/nextjs";
import { db } from "./db";

export async function getCurrentUser() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
    include: {
      cartItems: {
        include: {
          food: true,
        },
      },
      orders: {
        include: {
          orderItems: {
            include: {
              food: true,
            },
          },
        },
      },
    },
  });

  return user;
}
