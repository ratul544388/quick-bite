import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (user?.isAdmin) {
    redirect("/admin/dashboard");
  }
  return <div className="flex-1 flex-grow">{children}</div>;
}
