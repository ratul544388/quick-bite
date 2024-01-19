"use client";

import { FullUser } from "@/types";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Cart } from "./cart";
import { HeaderSearch } from "./header-search";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { UserButton } from "./user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Header = ({ currentUser }: { currentUser: FullUser }) => {
  return (
    <header className="sticky inset-x-0 top-0 border-b shadow-md z-50 w-full">
      <MaxWidthWrapper className="flex items-center justify-between h-[70px] bg-background">
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
          <HeaderSearch />
          <Cart currentUser={currentUser} />
          <UserButton currentUser={currentUser} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
