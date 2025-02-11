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
type LinkConfig = {
  label: string;
  href: string;
  target?: React.HTMLProps<HTMLAnchorElement>["target"];
};

export const testnetLinks = [
  { label: "Faucet", href: "/faucet" },
  { label: "Deploy", href: "/deploy" },
];

export const defaultLinks = [
  { label: "Raises", href: "/#" },
] satisfies LinkConfig[];

export const mobileSideLinks = [
  { label: "Tokenomics", href: "/bridge" },
  { label: "Bridge", href: "/bridge" },
  {
    label: "Docs",
    href: "https://axis.finance/docs/overview",
    target: "_blank",
  },
] satisfies LinkConfig[];

export const desktopLinks = [...defaultLinks, ...mobileSideLinks];

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

  const links: LinkConfig[] = React.useMemo(() => {
    if (props.links) return props.links;
    if (props.onlyDefault) return defaultLinks;

    return props.mobile && !props.showAll ? defaultLinks : desktopLinks;
  }, [props.links, props.onlyDefault]);

  return (
    <NavigationMenu>
      <NavigationMenuList
        className={cn(
          props.mobile && "flex w-full flex-col items-end",
          props.className,
        )}
      >
        {links.map((l) => (
          <NavigationMenuItem key={l.href}>
            <NavigationMenuLink asChild>
              <NavLink to={l.href} target={l.target ?? "_self"}>
                {({ isActive }) => (
                  <Button
                    variant="link"
                    onClick={() => props.onNavClick?.()}
                    className={cn(
                      "text-foreground px-2 uppercase",
                      (isActive || (isRoot && l.href === "/auctions")) && //TODO: check if theres a better way with react-router
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
