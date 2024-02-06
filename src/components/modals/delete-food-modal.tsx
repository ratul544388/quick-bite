"use client";


import { deleteFood } from "@/actions/food-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const DeleteFoodModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { foodId } = data;

  if (!foodId) {
    return null;
  }

  const onConfirm = () => {
    startTransition(() => {
      deleteFood(foodId).then(({ error, success }) => {
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
      open={isOpen && type === "DELETE_FOOD_MODAL"}
      disabled={isPending}
      title="Delete Food"
      description="Are you sure you want to delete the Food? This action cannot be
      undone."
      className="max-w-[400px]"
    >
      <div className="flex justify-between">
        <Button disabled={isPending} onClick={onClose} variant="ghost">
          Close
        </Button>
        <Button variant="destructive" disabled={isPending} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
