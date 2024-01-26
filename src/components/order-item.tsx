"use client";

import { FullOrder, FullOrderItem } from "@/types";
import { Button } from "./ui/button";
import { Bike } from "lucide-react";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Photo } from "./photo";
import { cn, formatText } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { useOrder } from "@/hooks/use-order";

interface OrderItemProps {
  order: FullOrder;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const { onOpen } = useModal();
  const { handleOrder, isLoading } = useOrder();

  const orderItems = order.orderItems.map((item) => ({
    food: item.food,
    quantity: item.quantity,
  }));

  return (
    <div
      key={order.id}
      className="bg-background rounded-lg border shadow-lg p-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Order ID: 334343</h3>
        <p
          className={cn(
            (order.status === "DELIVERY_PENDING" ||
              order.status === "DELIVERED") &&
              "text-green-600",
            order.status === "WAITING_FOR_PAYMENT" && "text-orange-500",
            order.status === "CANCELED" && "text-red-600",
            "font-medium"
          )}
        >
          {formatText(order.status)}
        </p>
      </div>
      <div
        className="flex gap-x-6 gap-y-2 flex-wrap"
        style={{ maxWidth: "calc(100% - 100px)" }}
      >
        <p className="text-muted-foreground text-sm">
          Order date:{" "}
          <span className="text-foreground font-semibold">
            {format(order.createdAt, "dd MMM yyyy")}
          </span>
        </p>
        <div className="flex items-center gap-1 font-semibold text-green-600">
          <Bike className="h-3.5 w-3.5" />
          Estimated delivery in 30 minutes.
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Photo photo={item.food.photo} className="max-w-[80px]" />
            <div className="space-y-1">
              <h4 className="font-semibold">{item.food.name}</h4>
              <p className="text-muted-foreground text-sm">
                {formatText(item.food.category)}
              </p>
            </div>
            <div className="space-y-1 ml-auto">
              <h4 className="font-bold">${item.food.price}</h4>
              <p className="text-muted-foreground text-sm">
                Qty: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      {order.status === "WAITING_FOR_PAYMENT" && (
        <div className="flex gap-3 ml-auto mt-3">
          <Button
            onClick={() => onOpen("CANCEL_ORDER_MODAL", { orderId: order.id })}
            variant="outline"
          >
            Cancel Order
          </Button>
          <Button onClick={() => handleOrder(orderItems)}>Make Payment</Button>
        </div>
      )}
    </div>
  );
};
