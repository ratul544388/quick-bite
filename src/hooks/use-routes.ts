import {
  Home,
  LayoutDashboard,
  ListOrdered,
  User2,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const useRoutes = (isAdmin?: boolean) => {
  const pathname = usePathname();
  let routes = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Menu",
      href: "/menu",
      icon: Utensils,
    },
    {
      label: "My orders",
      href: "/my-orders",
      icon: User2,
    },
  ];

  if (isAdmin) {
    routes = [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Foods",
        href: "/admin/foods",
        icon: UtensilsCrossed,
      },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ListOrdered,
      },
    ];
  }

  return routes;
};
