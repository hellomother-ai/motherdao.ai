import type { Meta, StoryObj } from "@storybook/react";
import { TransactionHashCard } from "modules/transaction/transaction-hash-card";

const meta = {
  title: "Transactions/TransactionHashCard",
  component: TransactionHashCard,
  args: {
    hash: "0x12341234",
    chainId: 168587773,
  },
} satisfies Meta<typeof TransactionHashCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Error: Story = {
  args: {
    ...Primary.args,
    error: {
      name: "Unit Overflow",
      message: "Needs to construct additional pylons",
    },
  },
};
export const Tight: Story = {
  decorators: [
    (Story) => (
      <div className="w-[200px] max-w-sm">
        <Story />
      </div>
    ),
  ],
};
