"use client";

import { FullUser } from "@/types";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Cart } from "./cart";
import { HeaderSearch } from "./header-search";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { UserButton } from "./user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = ({ currentUser }: { currentUser: FullUser }) => {
  const pathname = usePathname();
  return (
    <header className="sticky inset-x-0 top-0 border-b shadow-md z-50 w-full h-[70px]">
      <MaxWidthWrapper
        className={cn(
          "flex items-center justify-between h-full bg-background z-10",
          currentUser?.isAdmin && "max-w-screen-2xl"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <MobileSidebar currentUser={currentUser} />
              <Logo className="flex" />
            </div>
            <NavLinks isAdmin={!!currentUser?.isAdmin} />
          </div>
        </div>
        <div className="flex items-center gap-5">
          {currentUser && !currentUser?.isAdmin && (
            <>
              <HeaderSearch />
              <Cart currentUser={currentUser} />
            </>
          )}
          {currentUser ? (
            <UserButton currentUser={currentUser} />
          ) : (
            <>
              {pathname === "/sign-in" ? (
                <Link href="/sign-up" className={buttonVariants()}>
                  Sign up
                </Link>
              ) : (
                <Link href="/sign-in" className={buttonVariants()}>
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
