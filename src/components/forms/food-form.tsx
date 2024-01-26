"use client";

import JoditEditor from "jodit-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

import { createFood, updateFood } from "@/actions/food-action";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/constants";
import { FoodSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Food } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Combobox } from "../combo-box";

interface FoodFormProps {
  food?: Food;
}

export const FoodForm = ({ food }: FoodFormProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      photo: "",
      name: "",
      category: "",
      price: undefined,
      description: "",
    },
  });

  useEffect(() => {
    if (food) {
      form.setValue("name", food.name);
      form.setValue("category", food.category);
      form.setValue("photo", food.photo);
      form.setValue("price", food.price);
      form.setValue("description", food?.description || "");
    }
  }, [form, food]);

  function onSubmit(values: z.infer<typeof FoodSchema>) {
    startTransition(() => {
      if (food) {
        updateFood({ values, foodId: food.id }).then(({ error, success }) => {
          if (success) {
            toast.success(success);
            router.push("/admin/foods");
            router.refresh();
          } else if (error) {
            toast.error(error);
          }
        });
      } else {
        createFood(values).then(({ error, success }) => {
          if (success) {
            toast.success(success);
            router.push("/admin/foods");
            router.refresh();
          } else if (error) {
            toast.error(error);
          }
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 sm:grid-cols-2 bg-background p-5 rounded-xl border shadow-lg"
      >
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize="words"
                  placeholder="Cuisine's name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  options={categories.slice(1).map((item) => item)}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Select a category"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Cuisine's price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <JoditEditor
                  value={field.value}
                  onBlur={(newContent) => field.onChange(newContent)}
                  onChange={(newContent) => {
                    field.onChange(newContent);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="ml-auto sm:col-span-2">
          {food ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
