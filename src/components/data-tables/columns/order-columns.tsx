"use client";

import { Photo } from "@/components/photo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Food, Order, OrderItem, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Rotate3D } from "lucide-react";
import { useState } from "react";
import { OrderItemsCell } from "../order-items-cell";
import { cn, formatText } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { OrderCellAction } from "../cell-actions/order-cell-actions";
import { Nanum_Myeongjo } from "next/font/google";

export const orderColumns: ColumnDef<
  Order & { orderItems: (OrderItem & { food: Food })[]; user: User }
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "Order By",
    cell: ({ row }) => {
      const { name, phone, address, imageUrl, email } = row.original.user;
      return (
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Name: <span className="text-foreground font-semibold">{name}</span>
          </p>
          <p className="text-muted-foreground">
            Phone:{" "}
            <span className="text-foreground font-semibold">{phone}</span>
          </p>
          <p className="text-muted-foreground">
            Email:{" "}
            <span className="text-foreground font-semibold">{email}</span>
          </p>
          <p className="text-muted-foreground">
            Address:{" "}
            <span className="text-foreground font-semibold">{address}</span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
    cell: ({ row }) => {
      const orderItems = row.original.orderItems;
      return <OrderItemsCell orderItems={orderItems} />;
    },
  },
  {
    accessorKey: "id",
    header: "Total Price",
    cell: ({ row }) => {
      const total = row.original.orderItems.reduce((total, item) => {
        return total + item.food.price * item.quantity;
      }, 0);
      return <p className="font-bold">${total}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <p
          className={cn(
            "font-semibold",
            status === "DELIVERY_PENDING" && "text-orange-500",
            status === "WAITING_FOR_PAYMENT" && "text-red-500",
            status === "CANCELED" && "text-red-500",
            status === "DELIVERED" && "text-green-500"
          )}
        >
          {formatText(status)}
        </p>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <OrderCellAction order={row.original} />;
    },
  },
];
