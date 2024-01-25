import { FoodForm } from "@/components/forms/food-form";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Utensils } from "lucide-react";

const NewFoodPage = () => {
  return (
    <div className="flex flex-col h-full gap-3">
      <PageHeader
        navigations={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Foods",
            href: "/admin/foods",
          },
          {
            label: "New",
          },
        ]}
        actionLabel="Cancel"
        actionUrl="/admin/cuisines"
      />
      <Separator />
      <FoodForm />
    </div>
  );
};

export default NewFoodPage;
