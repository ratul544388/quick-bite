"use client";


import { deleteReview } from "@/actions/review-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const DeleteReviewModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { reviewId } = data;

  if (!reviewId) {
    return null;
  }

  const onConfirm = () => {
    startTransition(() => {
      deleteReview(reviewId).then(({ error, success }) => {
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
      open={isOpen && type === "DELETE_REVIEW_MODAL"}
      title="Delete Review"
      description="Are you sure you want to delete your review? This action cannot be
      undone."
      disabled={isPending}
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
