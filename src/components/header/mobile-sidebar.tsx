"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRoutes } from "@/hooks/use-routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { useLoadingStore } from "@/hooks/use-loading-store";

interface CartProps {
  currentUser: User | null;
}

export const MobileSidebar = ({ currentUser }: CartProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const routes = useRoutes(currentUser?.isAdmin);
  const handleTrigger = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleTrigger}>
      <SheetTrigger asChild className="sm:hidden" onClick={handleTrigger}>
        <Button size="icon" className="relative" variant="ghost">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 py-3 flex flex-col h-full">
        <SheetHeader>
          <Logo className="ml-10" />
        </SheetHeader>
        <div className="mt-4 flex flex-col">
          {routes.map(({ href, icon: Icon, label }) => (
            <Link
              href={href}
              key={href}
              onClick={handleClick}
              className={cn(
                "pl-10 relative flex items-center gap-4 py-3 hover:bg-primary/5 font-medium",
                href === pathname && "bg-primary/5 font-semibold"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
              <div
                className={cn(
                  "absolute right-0 h-full w-[5px] bg-primary rounded-full hidden",
                  href === pathname && "block"
                )}
              />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
