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
  return <div className="pb-10">{children}</div>;
}
