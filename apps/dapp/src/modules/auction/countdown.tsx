import { useEffect, useState } from "react";
import type { PropsWithAuction } from "@axis-finance/types";
import { Metric, Text, cn } from "@repo/ui";
import { formatDate } from "@repo/ui";
import { getCountdown } from "utils/date";

export function Countdown({
  auction,
  className,
}: PropsWithAuction & {
  className?: string;
}) {
  const [timeDistance, setTimeDistance] = useState<string | null>("");
  const startDate = new Date(Number(auction.start) * 1000);
  const endDate = new Date(Number(auction.conclusion) * 1000);
  const now = new Date();

  const isOngoing = startDate <= now && endDate > now;

  const isntStarted = startDate > now;
  const isntFinished = isntStarted || isOngoing;

  const isFinished =
    now > endDate ||
    auction.status === "concluded" ||
    auction.status === "settled" ||
    auction.status === "decrypted";

  const targetDate = isntStarted ? startDate : endDate;

  // Immediately set the countdown if the auction is ongoing
  useEffect(() => {
    if (isntFinished) {
      setTimeDistance(getCountdown(targetDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (isntFinished) {
        setTimeDistance(getCountdown(targetDate));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate, isOngoing]);

  return (
    <div className={cn("flex items-center gap-x-6", className)}>
      <CountdownStatus auction={auction} />
      {isFinished ? (
        <Text size="lg">
          {formatDate.simple(new Date(+auction.conclusion * 1000))}
        </Text>
      ) : (
        <CountdownDisplay time={isFinished ? "00:00:00:00" : timeDistance!} />
      )}
    </div>
  );
}

function CountdownStatus(props: PropsWithAuction) {
  let phrasalVerb = "ended on";

  switch (props.auction.status) {
    case "created":
      phrasalVerb = "starts in";
      break;
    case "live":
      phrasalVerb = "ends in";
  }

  return (
    <Text uppercase spaced mono size="sm" color="secondary" className="">
      Launch <br />
      {phrasalVerb}
    </Text>
  );
}

function CountdownDisplay({ time }: { time: string }) {
  const [d, h, m, s] = time.split(":");
  return (
    <div className="m-0 flex gap-x-5 self-center justify-self-center pb-0 *:leading-none">
      <Metric mono label="days">
        {d}
      </Metric>
      <Metric mono label="hours">
        {h}
      </Metric>
      <Metric mono label="mins" className="-ml-2">
        {m}
      </Metric>
      <Metric mono label="secs">
        {s}
      </Metric>
    </div>
  );
}
