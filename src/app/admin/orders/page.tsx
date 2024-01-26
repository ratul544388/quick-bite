import { orderColumns } from "@/components/data-tables/columns/order-columns";
import { DataTable } from "@/components/data-tables/data-table";
import PageHeader from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

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

  const orders = await db.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          food: true,
        },
      },
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
            label: "Orders",
          },
        ]}
      />
      <Separator />
      <DataTable columns={orderColumns} data={orders} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default Page;
