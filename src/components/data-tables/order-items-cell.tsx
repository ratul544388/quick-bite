"use client";

import { Food, OrderItem } from "@prisma/client";
import { Photo } from "../photo";
import { Separator } from "../ui/separator";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface OrderItemsCellProps {
  orderItems: (OrderItem & {
    food: Food;
  })[];
}

export const OrderItemsCell = ({ orderItems }: OrderItemsCellProps) => {
  const [viewFullOrder, setViewFullOrder] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-lg leading-5 whitespace-nowrap">
          Total Items:{" "}
          <span className="font-bold text-primary">{orderItems.length}</span>
        </h3>
        {orderItems.length > 1 && (
          <Button
            onClick={() => setViewFullOrder(!viewFullOrder)}
            variant="outline"
            className="group hover:bg-primary hover:text-white transition-colors"
          >
            View Full Order
            <ChevronDown className="ml-2 h-4 w-4 group-hover:text-white transition-colors" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="flex items-center gap-3">
        <Photo
          photo={orderItems[0].food.photo}
          alt={orderItems[0].food.name}
          className="max-w-[100px]"
        />
        <div className="space-y-1">
          <h3 className="font-semibold">{orderItems[0].food.name}</h3>
          <p className="text-muted-foreground font-semibold">
            Price:{" "}
            <span className="font-bold text-primary">
              ${orderItems[0].food.price}
            </span>
          </p>
          <p className="text-muted-foreground font-semibold">
            Qty:{" "}
            <span className="font-bold text-primary">
              {orderItems[0].quantity}
            </span>
          </p>
        </div>
      </div>
      {viewFullOrder &&
        orderItems.slice(1).map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            <Photo
              photo={item.food.photo}
              alt={item.food.name}
              className="max-w-[100px]"
            />
            <div className="space-y-1">
              <h3 className="font-semibold">{item.food.name}</h3>
              <p className="text-muted-foreground font-semibold">
                Price:{" "}
                <span className="font-bold text-primary">
                  ${item.food.price}
                </span>
              </p>
              <p className="text-muted-foreground font-semibold">
                Qty:{" "}
                <span className="font-bold text-primary">{item.quantity}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
