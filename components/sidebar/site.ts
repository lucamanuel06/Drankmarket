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
};
