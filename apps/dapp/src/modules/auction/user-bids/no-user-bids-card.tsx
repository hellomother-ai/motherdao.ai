import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { Badge, Button, Card, Text } from "@repo/ui";

export function NoUserBidsCard() {
  return (
    <Card
      title="Auction settled"
      headerRightElement={<Badge color="ghost">No bid</Badge>}
    >
      <div className="flex flex-col gap-y-4">
        <div className="green-gradient w-fill flex h-[464px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-[92.351]px h-[80px]"
              src="/images/axis-logo.svg"
              alt="Axis Logo"
            />
            <Text size="xl">Auction has ended</Text>
            <Text>You missed this auction.</Text>
          </div>
        </div>
        <Link to="/auctions">
          <Button size="lg" variant="secondary" className="w-full">
            View live auctions <ArrowRightIcon className="size-6" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
