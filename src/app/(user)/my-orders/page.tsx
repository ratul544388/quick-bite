import { getOrders } from "@/actions/order-action";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/current-user";
import { ArrowLeft, Bike, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Photo } from "@/components/photo";
import { formatText } from "@/lib/utils";
import { OrderItem } from "@/components/order-item";
import PageHeader from "@/components/page-header";

const MyOrderpage = async () => {
  const user = await getCurrentUser();

  const orders = await getOrders({ userId: user?.id });

  return (
    <MaxWidthWrapper className="space-y-5 pb-10">
      <PageHeader
        navigations={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "My orders",
          },
        ]}
      />
      <section className="space-y-5">
        {orders.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </section>
    </MaxWidthWrapper>
  );
};

export default MyOrderpage;
