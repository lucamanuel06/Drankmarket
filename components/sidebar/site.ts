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
      label: "Beurs",
      href: Constants.Stocks,
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
      label: "Kassa's",
      href: Constants.ManageDevices,
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
