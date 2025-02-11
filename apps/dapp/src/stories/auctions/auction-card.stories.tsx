import type { Meta, StoryObj } from "@storybook/react";
import { AuctionCard as AuctionCardV2 } from "modules/auction/auction-card";
import { getAuctionMock } from "../mocks/auction";

const meta = {
  title: "Auctions/AuctionCard",
  component: AuctionCardV2,
  args: {
    auction: getAuctionMock(),
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof AuctionCardV2>;

export default meta;

type Story = StoryObj<typeof AuctionCardV2>;

export const Created: Story = {
  args: { ...meta.args, auction: { ...meta.args.auction, status: "created" } },
};

export const Cancelled: Story = {
  args: {
    ...meta.args,
    auction: { ...meta.args.auction, status: "cancelled" },
  },
};

export const Live: Story = {
  args: { ...meta.args, auction: { ...meta.args.auction, status: "live" } },
};

export const Concluded: Story = {
  args: {
    ...meta.args,
    auction: { ...meta.args.auction, status: "concluded" },
  },
};

export const Decrypted: Story = {
  args: {
    ...meta.args,
    auction: { ...meta.args.auction, status: "decrypted" },
  },
};

export const Settled: Story = {
  args: { ...meta.args, auction: { ...meta.args.auction, status: "settled" } },
};

export const GridView: Story = {
  args: {
    isGrid: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  decorators: [
    (Story) => (
      <div className="h-[396px] w-[954px]">
        <Story />
      </div>
    ),
  ],
};

export const GridLoading: Story = {
  args: {
    ...Loading.args,
    isGrid: true,
  },
  decorators: Loading.decorators,
};
