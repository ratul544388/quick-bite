import PageHeader from "@/components/page-header";
import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="space-y-4">
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
  );
};

export default ProfilePage;
