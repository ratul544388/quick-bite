"use client";

import * as z from "zod";

import { ReviewForm } from "@/components/forms/review-form";
import { Separator } from "@/components/ui/separator";
import { Food, Review, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Star } from "@/components/star";
import { ActionDropdownMenu } from "@/components/action-dropdown-menu";
import { EditIcon, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { FullFood, FullUser } from "@/types";
import { UserAvatar } from "../user-avatar";
import { foodColumns } from "../data-tables/columns/food-columns";
import { Stars } from "../stars";

const formSchema = z.object({
  star: z
    .number({
      required_error: "Rating must be in btweetn 1-5",
      invalid_type_error: "Rating must be in btweetn 1-5",
    })
    .max(400, { message: "400 Characters are allowed" }),
  message: z.string().optional(),
});

interface FoodReviewsProps {
  food: FullFood;
  currentUser: FullUser;
}

const FoodReviews: React.FC<FoodReviewsProps> = ({ food, currentUser }) => {
  const { onOpen } = useModal();
  const [editingId, setEditingId] = useState("");

  const userReview = food.reviews.find(
    (review) => review.userId === currentUser?.id
  );

  const hasPurchased = currentUser?.orders.some((order) =>
    order.orderItems.some((item) => item.foodId === food.id)
  );

  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="bg-background rounded-xl shadow-lg p-3">
        <h1 className="text-2xl font-bold text-primary text-center">Reviews</h1>
        {hasPurchased && !userReview && <ReviewForm food={food} />}
      </div>
      <section className="grid sm:grid-cols-2 gap-6">
        {food.reviews.map((review) => (
          <>
            {editingId === review.id ? (
              <ReviewForm
                food={food}
                review={review}
                onCancel={() => setEditingId("")}
              />
            ) : (
              <div
                key={review.id}
                className="space-y-3 p-3 h-fit shadow-lg rounded-lg relative bg-background"
              >
                {currentUser?.id === review.userId && (
                  <ActionDropdownMenu
                    items={[
                      {
                        label: "Edit",
                        icon: EditIcon,
                        onClick: () => setEditingId(review.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash,
                        onClick: () =>
                          onOpen("DELETE_REVIEW_MODAL", {
                            reviewId: review.id,
                          }),
                        isDestructive: true,
                      },
                    ]}
                    className="absolute top-1 right-1"
                  />
                )}
                <div key={review.id} className="flex items-center gap-2">
                  <UserAvatar
                    image={review.user.imageUrl}
                    alt={review.user.name}
                  />
                  <div>
                    <h4 className="text-sm font-bold">{review.user.name}</h4>
                    <Stars rating={review.star} />
                  </div>
                </div>
                <p className="">{review.comment}</p>
              </div>
            )}
          </>
        ))}
        {!food.reviews.length && (
          <p className="text text-muted-foreground mt-3 mx-auto sm:col-span-2">
            No review Yet
          </p>
        )}
      </section>
    </div>
  );
};

export default FoodReviews;
