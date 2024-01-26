import * as z from "zod";

export const FoodSchema = z.object({
  photo: z.string({ required_error: "Photo is required" }),
  name: z.string().min(3, {
    message: "Name is too short",
  }),
  category: z
    .string({ required_error: "Category is requried" })
    .min(1, { message: "Category must be selected" }),
  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price is required",
  }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    })
    .min(10, { message: "Min 10 characters are required" })
    .max(2000, {
      message: "Description cannot be more than 2000 characters in length",
    }),
});

export const ReviewSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Review is Too short" })
    .max(1000, { message: "Maximum 1000 characters are allowed" }),
  star: z.coerce.number().min(0.5).max(5),
});

export const shippingAddressSchema = z.object({
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Phone number must contains 10-11 digits" })
    .max(11, { message: "Phone number must contains 10-11 digits" }),
  address: z.string().min(3, { message: "Address is too short" }),
});
