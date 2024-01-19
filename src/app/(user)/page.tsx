import { getFoods } from "@/actions/food-action";
import { FoodSlider } from "@/components/foods/food-slider";
import Footer from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import { ArrowRight, Bike } from "lucide-react";
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
    <div>
      <MaxWidthWrapper className="flex flex-col gap-16 mt-5">
        <div className="flex lg:flex-row justify-between flex-col items-center gap-8 bg-gradient-to-r from-red-300/30 to-red-500/40 p-6 rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <Badge variant="secondary" className="bg-slate-200">
              Quick delivery
              <Bike className="h-4 w-4 ml-2 text-primary" />
            </Badge>
            <h1 className="font-extrabold leading-[60px] text-5xl text-center flex items-end text-primary">
              Hungry? You are in the right place.
            </h1>
            <p>
              Order any meal at may time and we will deliver it directly to you
              home.
            </p>
            <Link
              href="/menu"
              className={cn(buttonVariants(), "mt-5 rounded-full")}
            >
              Explore Our Offerings
            </Link>
            <Link
              href="/menu"
              className="w-fit text-lg mt-10 cursor-pointer hover:underline font-semibold flex items-center gap-2"
            >
              Sepcials for lunch
              <ArrowRight className="h-6 w-5 text-primary" />
            </Link>
          </div>
          <Image src="/images/hero.png" alt="hero" width={500} height={500} />
        </div>
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
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
