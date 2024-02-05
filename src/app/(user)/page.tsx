import { FoodSlider } from "@/components/foods/food-slider";
import Footer from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/current-user";
import Image from "next/image";

export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();
  let category = searchParams.category as string;
  if (category) {
    category = category.toUpperCase();
  }

  return (
    <div className="h-full flex flex-col w-full">
      <div className="w-full h-[50vh] absolute top-[70px] left-0">
        <Image
          src="/images/hero.jpg"
          alt="hero"
          fill
          className="object-cover"
        />
      </div>
      <div
        className="flex flex-col gap-16 h-full w-full"
        style={{ paddingTop: "calc(50vh + 70px)" }}
      >
        <FoodSlider
          queryKey={["popular"]}
          label="Most Popular"
          currentUser={currentUser}
          type="POPULAR"
        />
        <FoodSlider
          queryKey={["top-rated"]}
          label="Top Rated"
          currentUser={currentUser}
          type="TOP_RATED"
        />
      </div>
    </div>
  );
}
