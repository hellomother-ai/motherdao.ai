import type { Meta, StoryObj } from "@storybook/react";
import { TokenWrapper } from "modules/token/token-wrapper";
// import { mainnetDeployments } from "@axis-finance/deployments";
import { DialogRoot } from "@repo/ui";

const meta = {
  title: "Tokens/TokenWrapper",
  component: TokenWrapper,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof TokenWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
