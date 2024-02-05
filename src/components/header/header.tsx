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
import { ThemeToggler } from "../theme-toggler";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Menu, ShoppingCart } from "lucide-react";
import { useSheet } from "@/hooks/use-sheet-store";

export const Header = ({ currentUser }: { currentUser: FullUser }) => {
  const pathname = usePathname();
  const { onOpen } = useSheet();
  return (
    <header className="fixed bg-background border-b inset-x-0 top-0 z-50 w-full h-[70px]">
      <MaxWidthWrapper
        className={cn(
          "flex items-center justify-between h-full z-10",
          currentUser?.isAdmin && "max-w-screen-2xl"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onOpen("sidebar")}
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-6 w-6 text-muted-foreground" />
              </Button>
              <Logo className="flex" />
            </div>
            <NavLinks isAdmin={!!currentUser?.isAdmin} />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <HeaderSearch />
          <ThemeToggler />
          {currentUser && !currentUser?.isAdmin && (
            <Button
              onClick={() => onOpen("cart")}
              size="icon"
              className="relative"
              variant="ghost"
            >
              <ShoppingCart className="h-5 w-5" />
              <div className="h-[18px] w-[18px] absolute top-0 right-0 rounded-full bg-primary text-white ">
                {currentUser.cartItems.length || 0}
              </div>
            </Button>
          )}
          {currentUser ? (
            <UserButton currentUser={currentUser} />
          ) : (
            <>
              {pathname === "/sign-in" ? (
                <Button asChild size="sm">
                  <SignUpButton>Register</SignUpButton>
                </Button>
              ) : (
                <Button asChild size="sm">
                  <SignInButton>Log in</SignInButton>
                </Button>
              )}
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
