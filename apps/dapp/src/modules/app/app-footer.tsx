import { Button, Link, cn } from "@repo/ui";
import { SocialRow } from "../../components/social-row";
import { SOCIALS } from "../../../../../app-config";

const { DISCORD_URL, TWITTER_URL, WEBSITE_URL, CONTACT_URL } = SOCIALS;

export function AppFooter() {
  return (
    <div className="max-w-limit mx-auto hidden w-full py-6 lg:block">
      <div
        className={cn(
          "flex h-12 items-center justify-between rounded-full",
          "bg-neutral-200 dark:bg-neutral-50",
        )}
      >
        <div
          className={cn(
            "text-surface flex items-center gap-x-3 px-4",
            "text-foreground dark:text-neutral-500",
          )}
        >
          <SocialRow
            discord={DISCORD_URL}
            twitter={TWITTER_URL}
            website={WEBSITE_URL}
            iconClassName={"size-8"}
          />
          <Link href={CONTACT_URL} target="_blank">
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
