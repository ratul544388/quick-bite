"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useOrder } from "@/hooks/use-order";
import { useState } from "react";
import { Counter } from "../counter";
import { Photo } from "../photo";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Modal } from "./modal";

export const OrderModal = () => {
  const { isOpen, data, type, onClose } = useModal();
  const { handleOrder, isLoading } = useOrder();

  const [quantity, setQuantity] = useState(1);
  const { food } = data;

  if (!food) return null;

  return (
    <Modal open={isOpen && type === "ORDER_MODAL"} disabled={isLoading}>
      <div className="space-y-3 flex-1 flex-grow overflow-y-auto">
        <div className="flex items-center gap-3">
          <Photo photo={food.photo} className="max-w-[100px]" />
          <div className="space-y-1 w-full">
            <h3 className="font-semibold">{food.name}</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">
                  qty:{" "}
                  <span className="font-bold text-foreground">{quantity}</span>
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  price:{" "}
                  <span className="font-bold text-foreground">
                    ${food.price * quantity}
                  </span>
                </p>
              </div>
              <Counter
                quantity={quantity}
                onChange={(value) => setQuantity(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-5"/>
      <div className="flex justify-end gap-4 items-center">
        <h3 className="font-bold">
          Total: <span className="text-primary">${food.price * quantity}</span>
        </h3>
        <Button
          disabled={isLoading}
          onClick={() => handleOrder([{ food, quantity }])}
        >
          Place Order
        </Button>
      </div>
    </Modal>
  );
};
