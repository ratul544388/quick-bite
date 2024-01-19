import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="flex-1 flex-grow pb-10">
      {children}
    </MaxWidthWrapper>
  );
}

export default MainLayout;
