import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  cn,
} from "@repo/ui";
import React from "react";
import { NavLink } from "react-router-dom";
import { environment } from "utils/environment";
import { LinkConfig, defaultLinks, desktopLinks } from "./navigation-config";

type NavbarProps = {
  links?: LinkConfig[];
  mobile?: boolean;
  showAll?: boolean;
  onlyDefault?: boolean;
  className?: string;
  onNavClick?: () => void;
};

export default function Navbar(props: NavbarProps) {
  const isRoot = window.location.hash === "#/";
  const { isTestnet } = environment;

  const links: LinkConfig[] = React.useMemo(() => {
    if (props.links) return props.links;
    if (props.onlyDefault) return defaultLinks;

    return props.mobile && !props.showAll ? defaultLinks : desktopLinks;
  }, [props.links, props.onlyDefault, props.mobile, props.showAll]);

  return (
    <NavigationMenu>
      <NavigationMenuList
        className={cn(
          props.mobile && "flex w-full flex-col items-end",
          "bg-black text-white",
          props.className,
        )}
      >
        {links
          .filter((l) => !isTestnet || !l.disabledOnTestnet)
          .map((l) => (
            <NavigationMenuItem key={l.href}>
              <NavigationMenuLink asChild>
                <NavLink to={l.href} target={l.target ?? "_self"}>
                  {({ isActive }) => (
                    <Button
                      variant="link"
                      onClick={() => props.onNavClick?.()}
                      className={cn(
                        "px-2 uppercase text-white hover:text-gray-300",
                        (isActive || (isRoot && l.href === "/auctions")) &&
                          "text-primary",
                      )}
                    >
                      {l.label}
                    </Button>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
