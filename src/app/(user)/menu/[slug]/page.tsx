import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

import { getFoods } from "@/actions/food-action";
import FoodInfo from "@/components/foods/food-info";
import Footer from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import PageHeader from "@/components/page-header";

const Page = async ({ params }: { params: { slug: string } }) => {
  const food = await db.food.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
        take: 10,
      },
      orderItems: {
        include: {
          order: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
  const currentUser = await getCurrentUser();

  if (!food) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col gap-3">
      <PageHeader
        navigations={[
          {
            label: "Menu",
            href: "/menu",
          },
          {
            label: `${food.name}`,
          },
        ]}
      />
      <FoodInfo food={food} currentUser={currentUser} />
    </div>
  );
};

export default Page;
