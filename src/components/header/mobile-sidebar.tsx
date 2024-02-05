"use client";

import { User } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";

import { useRoutes } from "@/hooks/use-routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Sheet } from "../sheet";
import { useSheet } from "@/hooks/use-sheet-store";
import { Logo } from "./logo";

interface SheetProps {
  currentUser: User | null;
}

export const MobileSidebar = ({ currentUser }: SheetProps) => {
  const pathname = usePathname();
  const { isOpen, type, onClose } = useSheet();
  const routes = useRoutes(currentUser?.isAdmin);

  const trigger = <Menu className="h-6 w-6 text-muted-foreground" />;

  return (
    <Sheet open={isOpen && type === "sidebar"}>
      <Logo className="ml-10" />
      <div className="mt-6">
        {routes.map(({ href, icon: Icon, label }) => (
          <Link
            onClick={onClose}
            href={href}
            key={href}
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
    </Sheet>
  );
};
