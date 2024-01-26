import { getInfinityFoods } from "@/actions/food-action";
import { FoodsGrid } from "@/components/foods/foods-grid";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import PageHeader from "@/components/page-header";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const q = searchParams.q as string;
  const currentUser = await getCurrentUser();

  if (!q) {
    redirect("/");
  }

  const initialFoods = await getInfinityFoods({ q });

  return (
    <MaxWidthWrapper className="flex flex-col gap-4">
      <PageHeader
        navigations={[
          {
            label: "Menu",
            href: "/menu",
          },
          {
            label: `Searched for "${q}"`,
          },
        ]}
      />
      <FoodsGrid initialFoods={initialFoods} currentUser={currentUser} q={q} />
    </MaxWidthWrapper>
  );
};

export default SearchPage;
