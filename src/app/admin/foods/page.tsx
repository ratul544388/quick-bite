import { foodColumns } from "@/components/data-tables/columns/food-columns";
import { DataTable } from "@/components/data-tables/data-table";
import PageHeader from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { BadgePlus, UtensilsCrossed } from "lucide-react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const totalFoods = await db.food.count();
  const page = Number(searchParams.page) || 1;
  const take = 10;
  const skip = (page - 1) * take;
  const totalPages = Math.ceil(totalFoods / take);

  const foods = await db.food.findMany({
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take,
    skip,
  });

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        navigations={[
          {
            label: "Dashbaord",
            href: "/admin/dashboard",
          },
          {
            label: "Foods",
          },
        ]}
        actionLabel="Add new"
        actionUrl="/admin/foods/new"
      />
      <Separator />
      <DataTable columns={foodColumns} data={foods} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default Page;
