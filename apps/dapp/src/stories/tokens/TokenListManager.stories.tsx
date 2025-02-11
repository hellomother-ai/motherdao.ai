import type { Meta, StoryObj } from "@storybook/react";
import { TokenListManager } from "modules/token/token-list-manager";
// import { mainnetDeployments } from "@axis-finance/deployments";

// const tokens = mainnetDeployments[0].tokenList;

// const tokenlist = {
//   name: "Axis",
//   logoURI: "/logo-color.png",
//   tokens,
//   timestamp: Date.now().toString(),
//   version: {
//     major: 0,
//     minor: 0,
//     patch: 0,
//   },
// };

const meta = {
  title: "Tokens/TokenListManager",
  component: TokenListManager,
  args: {},
} satisfies Meta<typeof TokenListManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
