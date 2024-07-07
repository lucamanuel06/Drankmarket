export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "sideBar",
  description: "Navitems voor de sidebar.",
  navItems: [
    {
      label: "Faciliteiten",
      href: "/",
    },
    {
      label: "Gat",
      href: "/gat",
    },
    {
      label: "Spier",
      href: "/spier",
    },
  ],
  adminItems: [
    {
      label: "Admin",
      href: "/admin/",
    },
    {
      label: "Producten",
      href: "/admin/producten",
    },
    {
      label: "Barren",
      href: "/admin/barren",
    },
    {
      label: "Data",
      href: "/admin/data",
    },
  ]
};