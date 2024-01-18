import { usePathname } from "next/navigation";

export const useRoutes = (isAdmin: boolean) => {
  const pathname = usePathname();
  let routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Menu",
      href: "/menu",
    },
  ];

  if (isAdmin) {
    routes = [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
      },
      {
        label: "Foods",
        href: "/admin/foods",
      },
      {
        label: "Orders",
        href: "/admin/orders",
      },
    ];
  }

  return routes;
};
