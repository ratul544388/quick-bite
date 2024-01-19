"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ReviewSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createReview, updateReview } from "@/actions/review-action";
import { Food, Review } from "@prisma/client";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import { Star } from "../star";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  food: Food;
  review?: Review;
  onCancel?: () => void;
}

export const ReviewForm = ({ food, review, onCancel }: ReviewFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      comment: "",
      star: 0.5,
    },
  });

  function onSubmit(values: z.infer<typeof ReviewSchema>) {
    startTransition(() => {
      if (review) {
        updateReview({ values, foodId: food.id, reviewId: review.id }).then(
          ({ error, success }) => {
            if (success) {
              onCancel?.();
              toast.success(success);
              router.refresh();
            } else if (error) {
              toast.error(error);
            }
          }
        );
      } else {
        createReview({ values, foodId: food.id }).then(({ error, success }) => {
          if (success) {
            toast.success(success);
            router.refresh();
          } else if (error) {
            toast.error(error);
          }
        });
      }
    });
  }

  useEffect(() => {
    if (review) {
      form.reset({
        star: review.star,
        comment: review.comment,
      });
    }
  }, [form, review]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="py-4 border border-b-0 rounded-lg flex items-center justify-center">
          <Star
            value={form.getValues("star")}
            onChange={(value) => form.setValue("star", value)}
          />
        </div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="focus-visible:ring-0"
                  placeholder="Write Your Review"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3 justify-end">
          {review && (
            <Button
              onClick={onCancel}
              type="button"
              variant="ghost"
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {review ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
