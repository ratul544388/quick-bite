import Hero from "@/../public/images/hero.jpg";
import { FoodSlider } from "@/components/foods/food-slider";
import { getCurrentUser } from "@/lib/current-user";
import Image from "next/image";
import Link from "next/link";

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
          src={Hero}
          alt="hero"
          fill
          className="object-cover"
          placeholder="blur"
        />
      </div>
      <div className="flex flex-col gap-5 h-full pt-[50vh] mt-3 w-full">
        <Link
          href="/menu"
          className="py-3 flex justify-center bg-[#fdddaf] dark:bg-neutral-800 text-[#CC8119] font-bold text-lg rounded-lg"
        >
          Explore Our Menu
        </Link>
        <div className="space-y-16 mt-10">
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
    </div>
  );
}
