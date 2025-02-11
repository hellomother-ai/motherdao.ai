import type { Meta, StoryObj } from "@storybook/react";
import { AuctionCreationStatus } from "../../modules/auction/auction-creation-status";

const meta = {
  title: "Auctions/CreateAuctionStatusCard",
  component: AuctionCreationStatus,
  decorators: (Story) => (
    <div className="w-[300px]">
      <Story />
    </div>
  ),
} satisfies Meta<typeof AuctionCreationStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

const idle = {
  isPending: true,
  isIdle: true,
  isSuccess: false,
};
const success = {
  ...idle,
  isSuccess: true,
};

export const Primary: Story = {
  args: {
    chainId: 168587773,
    auctionHouseApproveTx: success,
    auctionHouseApproveReceipt: success,
    info: success,
    keypair: success,
    tx: success,
    txReceipt: success,
  },
};
