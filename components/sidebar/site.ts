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
  managementItems: [
    {
      label: "Beheer",
      href: Constants.Management,
    },
    {
      label: "Producten",
      href: Constants.ManageProducts,
    },
    {
      label: "Data",
      href: Constants.ManageData,
    },
  ],
  adminItems: [
    {
      label: "Admin",
      href: Constants.Admin,
    },
    {
      label: "Barren",
      href: Constants.AdminBars,
    },
  ]
};
