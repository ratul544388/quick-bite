"use client";

import { ActionDropdownMenu } from "@/components/action-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Food, Order } from "@prisma/client";
import { Bike, EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderCellActionProps {
  order: Order;
}

export const OrderCellAction = ({ order }: OrderCellActionProps) => {
  const { onOpen } = useModal();
  const orderId = order.id;
  return (
    <ActionDropdownMenu
      items={[
        {
          label: "Make is Delivered",
          icon: Bike,
          onClick: () => onOpen("DELIVER_ORDER_MODAL", { orderId }),
        },
        {
          label: "Cancel Order",
          icon: TrashIcon,
          onClick: () => onOpen("CANCEL_ORDER_MODAL", { orderId }),
          isDestructive: true,
        },
      ]}
    />
  );
};
