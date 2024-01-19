import { CartItem, Food, OrderItem, Order, Review, User } from "@prisma/client";

export type FullUser =
  | (User & {
      cartItems: (CartItem & {
        food: Food;
      })[];
    })
  | null;

export type FullFood = Food & {
  reviews: (Review & {
    user: User;
  })[];
  orderItems: (OrderItem & {
    order: Order & {
      user: User;
    };
  })[];
};

export type InitialFoods = {
  items: Food[];
  nextCursor: string | null;
};

export type FullCart = CartItem & {
  food: Food;
};
