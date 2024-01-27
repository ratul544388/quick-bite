import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import PageHeader from "@/components/page-header";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <MaxWidthWrapper className="pb-10">
      <div className="space-y-5 mx-auto w-fit">
        <PageHeader
          navigations={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Profile",
            },
          ]}
        />
        <UserProfile />
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
