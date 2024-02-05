"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { SignOutButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { BookUser, ListOrdered, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { UserAvatar } from "../user-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function UserButton({ currentUser }: { currentUser: User }) {
  const router = useRouter();

  const isAdmin = currentUser.isAdmin;
  const { onOpen } = useModal();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-fit w-fit p-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
          variant="ghost"
        >
          <UserAvatar image={currentUser.imageUrl} alt={currentUser.name} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="py-2 px-0">
        <>
          <div className="flex items-center gap-2 px-3 py-2.5">
            <UserAvatar image={currentUser.imageUrl} alt={currentUser.name} />
            <div className="flex flex-col line-clamp-1">
              <h1 className="line-clamp-1 font-semibold text-sm">
                {currentUser.email}
              </h1>
              <p className="text-muted-foreground text-sm line-clamp-1">
                {currentUser.name}
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 px-3 py-2 hover:bg-accent text-sm font-medium transition"
            role="button"
            onClick={() => router.push(`/profile`)}
          >
            <User2 className="h-4 w-4" />
            Profile
          </div>
          {!isAdmin && (
            <>
              <div
                className="flex items-center gap-3 px-3 py-2 hover:bg-accent text-sm font-medium transition"
                role="button"
                onClick={() => router.push("/my-orders")}
              >
                <ListOrdered className="h-4 w-4" />
                My orders
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 hover:bg-accent text-sm font-medium transition"
                role="button"
                onClick={() => onOpen("ADDRESS_MODAL", { user: currentUser })}
              >
                <BookUser className="h-4 w-4" />
                {currentUser.address
                  ? "Manage shipping info"
                  : "Add shipping info"}
              </div>
            </>
          )}
          <SignOutButton>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent text-sm font-medium transition">
              <LogOut className="h-4 w-4" />
              Logout
            </div>
          </SignOutButton>
        </>
      </PopoverContent>
    </Popover>
  );
}
