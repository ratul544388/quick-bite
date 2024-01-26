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

export const Header = ({ currentUser }: { currentUser: FullUser }) => {
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
          {!currentUser?.isAdmin && (
            <>
              <HeaderSearch />
              <Cart currentUser={currentUser} />
            </>
          )}
          <UserButton currentUser={currentUser} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
