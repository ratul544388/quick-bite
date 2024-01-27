"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { SignOutButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { BookUser, ListOrdered, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAvatar } from "../user-avatar";

export function UserButton({ currentUser }: { currentUser: User }) {
  const router = useRouter();

  const isAdmin = currentUser.isAdmin;
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-fit w-fit p-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
          variant="ghost"
        >
          <UserAvatar image={currentUser.imageUrl} alt={currentUser.name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
          {!isAdmin && (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`/profile/${currentUser.id}`)}
              >
                <User2 className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/my-orders")}>
                <ListOrdered className="h-4 w-4" />
                My orders
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            onClick={() => onOpen("ADDRESS_MODAL", { user: currentUser })}
          >
            <BookUser className="h-4 w-4" />
            {currentUser.address ? "Manage shipping info" : "Add shipping info"}
          </DropdownMenuItem>
          <SignOutButton>
            <DropdownMenuItem>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </SignOutButton>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
