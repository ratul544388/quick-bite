"use server";

import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

export type RevenueType = "TODAY" | "THIS_MONTH" | "TOTAL";
type OrderType = {
  page?: number;
  userId?: string;
  revenueType?: RevenueType;
};

export async function getOrders({
  page = 1,
  userId,
  revenueType,
}: OrderType = {}) {
  const take = 10;
  const skip = (page - 1) * take;
  const today = new Date();
  const orders = await db.order.findMany({
    where: {
      ...(userId ? { userId } : {}),
      ...(revenueType === "TODAY"
        ? {
            deliveredAt: {
              gte: startOfDay(today),
              lte: endOfDay(today),
            },
            status: "DELIVERED",
          }
        : revenueType === "THIS_MONTH"
        ? {
            deliveredAt: {
              gte: startOfMonth(today),
              lte: endOfMonth(today),
            },
            status: "DELIVERED",
          }
        : revenueType === "TOTAL"
        ? {
            status: "DELIVERED",
          }
        : {}),
    },
    include: {
      user: true,
      orderItems: {
        include: {
          food: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(take ? { take } : {}),
    skip,
  });

  return orders;
}

export async function cancelOrder(orderId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return { error: "Order not found" };
    }

    if (order.status === "DELIVERED" || order.status === "CANCELED") {
      return {
        error: "Order already delivered or Order has already been cancelled",
      };
    }

    if (order.status === "DELIVERY_PENDING" && !currentUser.isAdmin) {
      return {
        error: "Delivery is already pending. You cannot cancel the order.",
      };
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELED",
      },
    });

    return { success: "Order Cancelled" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deliverOrder(orderId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return { error: "Unauthorized" };
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return { error: "Order not found" };
    }

    if (order.status !== "DELIVERY_PENDING") {
      return {
        error: "Order cannot be delivered",
      };
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "DELIVERED",
      },
    });

    return { success: "Food was Delivered successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
