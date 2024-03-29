import { db } from "@/lib/db";
import { RevenueType, getOrders } from "./order-action";
import { getMonth } from "date-fns";

export const getRevenue = async ({ type }: { type: RevenueType }) => {
  const orders = await getOrders({ revenueType: type });

  const total = orders.reduce((total, item) => {
    const orderItems = item.orderItems.reduce((total, item) => {
      return total + item.food.price * item.quantity;
    }, 0);

    return total + orderItems;
  }, 0);

  return total;
};

export const getGraphRevenue = async () => {
  const graphData = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  const orders = await getOrders({ revenueType: "TOTAL" });

  orders.forEach((order) => {
    const month = getMonth(order?.deliveredAt || order.createdAt);
    const orderItems = order.orderItems.reduce((total, item) => {
      return (total = total + item.food.price * item.quantity);
    }, 0);

    graphData[month].total += orderItems;
  }, 0);
  return graphData;
};
