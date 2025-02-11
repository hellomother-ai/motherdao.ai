import type { Meta, StoryObj } from "@storybook/react";
import { TransactionDialog } from "modules/transaction/transaction-dialog";

const meta = {
  title: "Transactions/MutationDialog",
  component: TransactionDialog,
} satisfies Meta<typeof TransactionDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    mutation: {
      status: "idle",
      isIdle: false,
      isError: false,
      isPending: false,
      isSuccess: false,
    },
  },
};
