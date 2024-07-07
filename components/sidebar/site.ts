import { Constants } from "@/generic/constants";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "sideBar",
  description: "Navitems voor de sidebar.",
  navItems: [
    {
      label: "Faciliteiten",
      href: Constants.Home,
    },
    {
      label: "Gat",
      href: "/gat",
    },
    {
      label: "Spier",
      href: "/spier",
    },
    {
      label: "Log uit",
      href: Constants.Logout,
    },
  ],
  adminItems: [
    {
      label: "Admin",
      href: Constants.Admin,
    },
    {
      label: "Producten",
      href: Constants.AdminProducts,
    },
    {
      label: "Barren",
      href: Constants.AdminBars,
    },
    {
      label: "Data",
      href: Constants.AdminData,
    },
  ]
};
