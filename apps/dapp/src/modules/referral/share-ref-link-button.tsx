import { useAccount } from "wagmi";
import { Link, Button } from "@/components";
import { useReferralLink } from "./use-referral-link";

export function ShareRefLinkButton({ tweetUrl }: { tweetUrl?: string }) {
  const { address } = useAccount();
  const { getTweetUrl } = useReferralLink(address);

  return (
    <Button disabled={address == null} variant="secondary" asChild>
      <Link
        href={tweetUrl ?? getTweetUrl()}
        className="gap-x-sm flex items-center"
      >
        Share link on
        <img src="/images/x-logo.svg" className="inline h-[16px] w-[16px]" />
      </Link>
    </Button>
  );
}
