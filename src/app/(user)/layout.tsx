import Footer from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
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
  return (
    <div className="h-full flex flex-col">
      <MaxWidthWrapper className="h-full min-h-screen pb-32">
        {children}
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
