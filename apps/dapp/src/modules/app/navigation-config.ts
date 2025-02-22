type LinkConfig = {
  label: string;
  href: string;
  target?: React.HTMLProps<HTMLAnchorElement>["target"];
  /**Whether the link should render on testnets*/
  disabledOnTestnet?: boolean;
};

export const testnetLinks = [] satisfies LinkConfig[];

export const defaultLinks = [] satisfies LinkConfig[];

export const mobileSideLinks = [
  { label: "Bridge", href: "/bridge", disabledOnTestnet: true },
] satisfies LinkConfig[];

export const desktopLinks = [...defaultLinks, ...mobileSideLinks];

export type { LinkConfig };
