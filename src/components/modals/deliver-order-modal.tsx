"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deliverOrder } from "@/actions/order-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const DeliverOrderModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { orderId } = data;

  if (!orderId) {
    return null;
  }

  const onConfirm = () => {
    startTransition(() => {
      deliverOrder(orderId).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.refresh();
        } else if (error) {
          toast.error(error);
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  };

  return (
    <Modal
      open={isOpen && type === "DELIVER_ORDER_MODAL"}
      title="Make it Delivered"
      description="Are you sure you want to make the Order Delivered? This action
      cannot be undone."
      disabled={isPending}
      className="max-w-[400px]"
    >
      <div className="flex justify-between">
        <Button disabled={isPending} onClick={onClose} variant="ghost">
          Close
        </Button>
        <Button disabled={isPending} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
