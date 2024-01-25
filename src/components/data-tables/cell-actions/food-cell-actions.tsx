"use client";

import { ActionDropdownMenu } from "@/components/action-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Food } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface FoodCellActionsProps {
  food: Food;
}

export const FoodCellActions = ({ food }: FoodCellActionsProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  return (
    <ActionDropdownMenu
      items={[
        {
          label: "Edit",
          icon: EditIcon,
          onClick: () => router.push(`/admin/foods/${food.slug}/edit`),
        },
        {
          label: "Delete",
          icon: TrashIcon,
          onClick: () => onOpen("DELETE_FOOD_MODAL", { foodId: food.id }),
          isDestructive: true,
        },
      ]}
    />
  );
};
