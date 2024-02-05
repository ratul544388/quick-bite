"use client";

import { Cart } from "@/components/header/cart";
import { MobileSidebar } from "@/components/header/mobile-sidebar";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const SheetProvider = ({ user }: { user: User | null }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <MobileSidebar currentUser={user} />
      <Cart currentUser={user} />
    </>
  );
};
