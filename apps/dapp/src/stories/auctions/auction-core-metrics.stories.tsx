import type { Meta, StoryObj } from "@storybook/react";
import { AuctionCoreMetrics } from "modules/auction/auction-core-metrics";
import { getBatchAuctionMock } from "../mocks/batch-auction";

const meta = {
  title: "Auctions/AuctionCoreMetrics",
  component: AuctionCoreMetrics,
  args: {
    auction: getBatchAuctionMock(),
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AuctionCoreMetrics>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
