"use client";
import { useRoutes } from "@/hooks/use-routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = ({ isAdmin }: { isAdmin: boolean }) => {
  const routes = useRoutes(isAdmin);
  const pathname = usePathname();
  return (
    <div className="md:flex hidden items-center gap-6">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn("relative group font-semibold")}
        >
          <p
            className={cn(
              "text-foreground/70 group-hover:text-foreground transition-colors duration-300",
              pathname === route.href && "text-foreground"
            )}
          >
            {route.label}
          </p>
          <span
            className={cn(
              "w-0 h-1 transition-all duration-300 bg-primary absolute rounded-full",
              pathname === route.href && "w-full"
            )}
          />
        </Link>
      ))}
    </div>
  );
};
