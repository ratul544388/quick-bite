import { checkout } from "@/actions/checkout-action";
import { Food } from "@prisma/client";
import { useTransition } from "react";
import toast from "react-hot-toast";

type OrderItem = {
  food: Food;
  quantity: number;
};

export const useOrder = () => {
  const [isLoading, startTransition] = useTransition();
  const handleOrder = (orderItems: OrderItem[]) => {
    startTransition(() => {
      checkout({ orderItems }).then(({ error, url }) => {
        if (error) {
          toast.error(error);
        } else if (url) {
          window.location.assign(url);
        }
      });
    });
  };

  return { handleOrder, isLoading };
};
