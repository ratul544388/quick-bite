import { FoodForm } from "@/components/forms/food-form";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const food = await db.food.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!food) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <PageHeader
        navigations={[
          {
            label: "Dashboard",
            href: "dashboard",
          },
          {
            label: "Foods",
            href: "/admin/foods",
          },
          {
            label: `Edit: ${food.name}`,
          },
        ]}
      />
      <Separator />
      <FoodForm food={food} />
    </div>
  );
};

export default Page;
