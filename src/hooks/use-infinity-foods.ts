import { getFoods, getInfinityFoods } from "@/actions/food-action";
import { InitialFoods } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinityFoods = ({
  category,
  q,
  foodId,
  initialFoods,
  queryKey,
}: {
  category?: string;
  q?: string;
  foodId?: string;
  initialFoods: InitialFoods;
  queryKey: string[];
}) => {
  const { inView, ref } = useInView();

  const limit = 10;

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    //@ts-ignore;
    queryFn: async ({ pageParam = undefined }) => {
      const response = await getInfinityFoods({
        category,
        cursor: pageParam,
        foodId,
        limit,
        q,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: () => {
      return {
        pages: [initialFoods],
        pageParams: [undefined],
      };
    },
    initialPageParam: undefined,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const foods = data?.pages.flatMap((page) => page.items);

  return {
    foods,
    ref,
    hasNextPage,
    isFetchingNextPage,
    status,
    isRefetching,
    isFetching,
    refetch,
  };
};
