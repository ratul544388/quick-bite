"use server";

import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { shippingAddressSchema } from "@/schemas";
import * as z from "zod";

export async function updateShippingAddress(values: z.infer<typeof shippingAddressSchema>) {
  try {
    const validatedFields = shippingAddressSchema.safeParse(values);
    if (!validatedFields.success) {
    }
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: values,
    });

    return { success: "Success" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
