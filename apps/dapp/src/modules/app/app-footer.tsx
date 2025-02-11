import { Button, Link, Tooltip, cn, useTheme } from "@repo/ui";
import { SocialRow } from "../../components/social-row";
import { SOCIALS } from "../../../../../app-config";
import { AppVersion } from "./app-version";
import { AxisWordmark } from "./axis-wordmark";

const { DISCORD, TWITTER, WEBSITE, CONTACT } = SOCIALS;

export function AppFooter() {
  return (
    <div className="max-w-limit mx-auto hidden w-full py-6 lg:block">
      <div
        className={cn(
          "flex h-12 items-center justify-between rounded-full",
          "bg-neutral-200 dark:bg-neutral-50",
        )}
      >
        <PoweredByAxis />

        <div
          className={cn(
            "text-surface flex items-center gap-x-3 px-4",
            "text-foreground dark:text-neutral-500",
          )}
        >
          <SocialRow
            discord={DISCORD}
            twitter={TWITTER}
            website={WEBSITE}
            iconClassName={"size-8"}
          />
          <Link href={CONTACT} target="_blank">
            <Button
              size="sm"
              className={cn(
                "text-surface px-0 uppercase ",
                "text-foreground dark:text-neutral-500",
              )}
              variant="link"
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PoweredByAxis() {
  const { themeColor } = useTheme();
  return (
    <div className="text-foreground ml-4 flex items-center dark:text-neutral-500">
      {" "}
      <Tooltip
        content={
          <>
            App Version: <AppVersion />
          </>
        }
      >
        Powered by{" "}
        <AxisWordmark
          className="-mt-0.5 inline size-10"
          light={themeColor === "dark"}
        />
      </Tooltip>
    </div>
  );
}
