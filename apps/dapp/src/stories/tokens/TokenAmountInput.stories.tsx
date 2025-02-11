import type { Meta, StoryObj } from "@storybook/react";
import { TokenAmountInput } from "modules/token/token-amount-input";

const meta = {
  title: "Tokens/TokenAmountInput",
  component: TokenAmountInput,
} satisfies Meta<typeof TokenAmountInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Spend Amount",
    symbol: "ETH",
    usdPrice: "$4200.00",
    balance: "10,000",
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    error: "Your size is not size.",
  },
};

export const Message: Story = {
  args: {
    ...Primary.args,
    message: "You'll get a gazillion jillion tokens",
  },
};
