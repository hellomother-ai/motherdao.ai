import {
  cn,
  Link,
  DiscordLogoIcon,
  TwitterLogoIcon,
  GlobeIcon,
} from "@repo/ui";

type SocialURLs = {
  discord?: string;
  twitter?: string;
  website?: string;
  farcaster?: string;
  className?: string;
  iconClassName?: string;
};

export function SocialRow(props: SocialURLs) {
  return (
    <div className={cn("flex h-9 items-center gap-x-4 pl-2", props.className)}>
      {props.twitter && (
        <Link href={props.twitter}>
          <TwitterLogoIcon
            className={cn("size-4 hover:text-[#1DA1F2]", props.iconClassName)}
          />
        </Link>
      )}

      {props.discord && (
        <Link href={props.discord}>
          <DiscordLogoIcon
            className={cn("size-4 hover:text-[#7289da]", props.iconClassName)}
          />
        </Link>
      )}
      {props.farcaster && (
        <Link className="text-foreground flex" href={props.farcaster}>
          <img
            src="/images/farcaster-logo.svg"
            alt="farcaster logo"
            className={props.iconClassName}
          />
        </Link>
      )}
      {props.website && (
        <Link href={props.website}>
          <GlobeIcon
            className={cn(
              "hover:text-primary size-4 transition-all",
              props.iconClassName,
            )}
          />
        </Link>
      )}
    </div>
  );
}
