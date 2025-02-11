import { DataTable } from "@repo/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { Address } from "viem";

type ReferralLeaderboardData = {
  address: Address;
  totalFees: number;
  totalAuctions: number;
};

const columnHelper = createColumnHelper<ReferralLeaderboardData>();

const cols = [
  columnHelper.display({
    header: "Address",
  }),
  columnHelper.display({
    header: "Fees Collected",
  }),
  columnHelper.display({
    header: "Users Referred",
  }),
  columnHelper.display({
    header: "Total Auctions",
  }),
];

export function ReferralLeaderboard() {
  return (
    <div className="mask blur-sm">
      <DataTable data={Array.from(Array(8))} columns={cols} />
    </div>
  );
}
