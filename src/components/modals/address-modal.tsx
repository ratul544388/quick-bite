"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useModal } from "@/hooks/use-modal-store";
import { shippingAddressSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { updateShippingAddress } from "@/actions/shipping-address-action";

const AddressModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const hasAddress = data?.user?.address;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data.user) {
      form.setValue("address", data.user.address as string);
      form.setValue("phone", data.user.phone as string);
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof shippingAddressSchema>) {
    startTransition(() => {
      updateShippingAddress(values).then(({ error, success }) => {
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
  }

  return (
    <Dialog
      open={isOpen && type === "ADDRESS_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {hasAddress
              ? "Change shipping address"
              : "Add Your shipping address"}
          </DialogTitle>
          <DialogDescription>
            Please provide your shipping address in full details including
            District, street, zip code etc.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus={false}
                      isPending={isPending}
                      placeholder="Enter your full address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      isPending={isPending}
                      type="number"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto" disabled={isPending}>
              {hasAddress ? "Save" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
