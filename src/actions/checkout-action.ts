"use server";

import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Food } from "@prisma/client";
import Stripe from "stripe";

type CheckoutType = {
  orderItems: {
    food: Food;
    quantity: number;
  }[];
  clearCart?: "true" | "false";
};

export async function checkout({
  orderItems,
  clearCart = "false",
}: CheckoutType) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    if (!currentUser.address || !currentUser.phone) {
      return { error: "Phone Number or address are missing" };
    }

    const foodItems = orderItems.map((item) => ({
      foodId: item.food.id,
      quantity: item.quantity,
    }));

    const deletingOrder = await db.order.findFirst({
      where: {
        status: "WAITING_FOR_PAYMENT",
        userId: currentUser.id,
      },
    });

    if (deletingOrder) {
      await db.order.delete({
        where: {
          id: deletingOrder.id,
        },
      });
    }

    const order = await db.order.create({
      data: {
        status: "WAITING_FOR_PAYMENT",
        userId: currentUser.id,
        orderItems: {
          createMany: {
            data: foodItems,
          },
        },
      },
      include: {
        orderItems: {
          include: {
            food: true,
          },
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      orderItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: item.food.name,
            images: [item.food.photo],
          },
          unit_amount: Math.round(item.food.price * 100),
        },
      }));

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: currentUser.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: currentUser.email,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: currentUser.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        orderId: order.id,
        userId: currentUser.id,
        clearCart,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
