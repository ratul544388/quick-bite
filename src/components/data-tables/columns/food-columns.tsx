"use client";

import { Food, Order, OrderItem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { FoodCellActions } from "../cell-actions/food-cell-actions";
// import FoodCellAction from "../cell-actions/food-cell-action";

export const foodColumns: ColumnDef<
  Food & { orderItems: (OrderItem & { order: Order })[] }
>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <div className="w-[80px] h-[70px] relative rounded-lg overflow-hidden">
          <Image
            src={row.original.photo}
            alt="photo"
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <h1 className="capitalize">{row.getValue("name")}</h1>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.original.category.toLowerCase()}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <div className="capitalize">${row.original.price}</div>;
    },
  },
  {
    accessorKey: "orderItems",
    header: "Sales",
    cell: ({ row }) => {
      const total = row.original.orderItems.reduce((total, item) => {
        if (item.order.status !== "DELIVERED") {
          return total;
        }
        return (total = total + item.quantity);
      }, 0);

      return `${total}+`;
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <FoodCellActions food={row.original} />;
    },
  },
];
