"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import qs from "query-string";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = (page: number) => {
    const currentQuery = qs.parse(params.toString());
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...currentQuery,
        page,
      },
    });

    router.push(url, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3 w-fit ml-auto">
      <Button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className="bg-neutral-900 hover:bg-neutral-900/90 dark:bg-slate-100 dark:hover:bg-slate-100/90 dark:text-neutral-900"
      >
        <ChevronsLeft className="h-4 w-4 mr-2" />
        Prev
      </Button>
      <div className="min-w-[110px] flex justify-center text-sm text-muted-foreground">
        {currentPage} of {totalPages} pages
      </div>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
        className="bg-neutral-900 hover:bg-neutral-900/90 dark:bg-slate-100 dark:hover:bg-slate-100/90 dark:text-neutral-900"
      >
        Next
        <ChevronsRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
