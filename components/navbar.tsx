"use client";
import { usePathname } from "next/navigation";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import SideBar from "@/components/sidebar/page";
import { Constants } from "@/generic/constants";

export const Navbar = () => {
  const currentPage = usePathname();
  const showNavbar = currentPage === "/gat" || currentPage === "/spier";

  const showAdminButton =
    currentPage === Constants.AdminProducts ||
    currentPage === Constants.AdminBars ||
    currentPage === Constants.AdminData;

  return (
    <>
      <NextUINavbar
        className="bg-blue-500 mb-2"
        maxWidth="full"
        position="sticky"
      >
        <NavbarContent justify="start">
          <SideBar />
        </NavbarContent>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          {showNavbar && (
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium bg-blue-300 py-2 px-3 rounded-full",
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          )}
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {showNavbar && (
            <Button isIconOnly as={Link} className="bg-blue-300" href="/">
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </NavbarContent>
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {showAdminButton && (
            <Button isIconOnly as={Link} className="bg-blue-300" href={Constants.Admin}>
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
