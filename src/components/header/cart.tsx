"use client";

import { User } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Photo } from "../photo";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

import { getCartItems } from "@/actions/cart-action";
import { checkout } from "@/actions/checkout-action";

import { useQuery } from "@tanstack/react-query";
import { Separator } from "../ui/separator";
import { SingleCart } from "./single-cart";
import { useOrder } from "@/hooks/use-order";
import { Sheet } from "../sheet";
import { useSheet } from "@/hooks/use-sheet-store";

interface CartProps {
  currentUser: User | null;
}

export const Cart = ({ currentUser }: CartProps) => {
  const { isLoading, handleOrder } = useOrder();
  const { isOpen, type } = useSheet();
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await getCartItems(currentUser?.id);
      return response;
    },
    enabled: !!currentUser,
  });

  const totalPrice = data?.reduce((total, item) => {
    return total + item.food.price * item.quantity;
  }, 0);

  const [total, setTotal] = useState(0);

  const orderItems =
    data?.map((item) => ({
      food: item.food,
      quantity: item.quantity,
    })) || [];

  useEffect(() => {
    if (totalPrice) {
      setTotal(totalPrice);
    }
  }, [totalPrice]);

  return (
    <Sheet open={isOpen && type === "cart"} side="right">
      <div className="flex flex-col pt-3 pb-1 gap-1 items-center">
        <div className="flex gap-1 text-primary font-bold">
          <ShoppingCart className="h-5 w-5" />
          Cart
        </div>
        <Separator />
      </div>
      <div className="flex flex-col flex-grow flex-1">
        {!!!data?.length && (
          <div className="flex flex-col gap-3 my-auto w-full items-center">
            <Photo
              photo="/images/empty-cart.png"
              className="max-w-[60%] mt-auto aspect-square"
            />

            {currentUser ? (
              <p className="text-muted-foreground">
                Your food cart is hungry. Fill it up!
              </p>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-3">
                  <Link href="/sign-in" className={buttonVariants()}>
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "outline",
                    })}
                  >
                    Sign up
                  </Link>
                </div>
                <p className="text-muted-foreground">
                  Sign in or create a new account
                </p>
              </div>
            )}
          </div>
        )}
        <ScrollArea className="flex flex-col  max-h-[75vh]">
          {data?.map((item) => (
            <SingleCart key={item.id} cartItem={item} />
          ))}
        </ScrollArea>
      </div>
      {!!data?.length && (
        <div className="flex items-center justify-end gap-3 pr-4 p-3">
          <div className="font-semibold flex gap-2">
            Total:
            <p className="text-primary">${total?.toFixed(2)}</p>
          </div>
          <Button disabled={isLoading} onClick={() => handleOrder(orderItems)}>
            Checkout
          </Button>
        </div>
      )}
    </Sheet>
  );
};
