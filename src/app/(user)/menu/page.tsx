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
    <div className="flex flex-col gap-2 h-full">
      <Categories category={category} />
      <FoodsGrid
        initialFoods={initialFoods}
        currentUser={currentUser}
        category={category}
        afterSignInUrl="/menu"
      />
    </div>
  );
};

export default Page;
