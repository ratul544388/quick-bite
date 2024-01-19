import { getInfinityFoods } from "@/actions/food-action";
import { Categories } from "@/components/categories";
import { FoodsGrid } from "@/components/foods/foods-grid";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/current-user";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const currentUser = await getCurrentUser();

  let category = searchParams.category;

  const initialFoods = await getInfinityFoods({ category });

  return (
    <MaxWidthWrapper className="space-y-2">
      <Categories category={category} />
      <FoodsGrid
        initialFoods={initialFoods}
        currentUser={currentUser}
        category={category}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
