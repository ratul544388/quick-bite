import { getRevenue } from "@/actions/revenue-action";
import { BadgeCent, DollarSign, Receipt } from "lucide-react";
import React from "react";

const dashboardPage = async () => {
  const totalRevenue = await getRevenue({ type: "TOTAL" });
  const thisMonth = await getRevenue({ type: "THIS_MONTH" });
  const todaysRevenue = await getRevenue({ type: "TODAY" });

  const revenueCards = [
    {
      label: "Total Revenue",
      value: totalRevenue,
      icon: DollarSign,
    },
    {
      label: "Sales This Month",
      value: thisMonth,
      icon: Receipt,
    },
    {
      label: "Today's Sales",
      value: todaysRevenue,
      icon: BadgeCent,
    },
  ];
  return (
    <div className="space-y-5">
      <h3 className="text-2xl font-bold">Admin Dashboard</h3>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {revenueCards.map((item) => (
          <div
            key={item.label}
            className="relative p-4 space-y-1 rounded-lg bg-background border shadow-md overflow-hidden"
          >
            <item.icon className="absolute h-28 w-28 text-foreground/10 right-0 top-0 -translate-y-[20%] translate-x-[30%]" />
            <h3 className="text-lg font-semibold">{item.label}</h3>
            <h2 className="font-bold text-3xl text-primary">${item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboardPage;
