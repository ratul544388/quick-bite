import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/current-user";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    notFound();
  }
  return (
    <MaxWidthWrapper className="h-full max-w-screen-2xl pb-10">
      {children}
    </MaxWidthWrapper>
  );
}
