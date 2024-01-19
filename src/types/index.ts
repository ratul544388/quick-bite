import { CartItem, Food, OrderItem, Order, Review, User } from "@prisma/client";

export type FullUser =
  | (User & {
      cartItems: (CartItem & {
        food: Food;
      })[];
      orders: (Order & {
        orderItems: (OrderItem & {
          food: Food;
        })[];
      })[];
    })
  | null;

export type FullFood = Food & {
  reviews: (Review & {
    user: User;
  })[];
};

export type InitialFoods = {
  items: Food[];
  nextCursor: string | null;
};

export type FullCart = CartItem & {
  food: Food;
};
