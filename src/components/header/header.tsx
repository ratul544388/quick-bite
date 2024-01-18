"use client";

// import { FullCartTypes } from "@/types";
import { User } from "@prisma/client";
// import { MobileSidebar } from "../mobile-sidebar";
// import { Cart } from "./cart";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { UserButton } from "./user-button";
// import { NavSearch } from "./nav-search";
// import { UserButton } from "./user-button";

export const Header = ({ currentUser }: { currentUser: User | null }) => {
  return (
    <header className="sticky inset-x-0 top-0 border-b shadow-md z-50 w-full">
      <MaxWidthWrapper className="flex items-center justify-between h-[70px] bg-background">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              {/* <MobileSidebar currentUser={currentUser} /> */}
              <Logo className="flex" />
            </div>
            <NavLinks isAdmin={!!currentUser?.isAdmin} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <NavSearch /> */}
          {/* <Cart currentUser={currentUser} /> */}
          <UserButton currentUser={currentUser} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
