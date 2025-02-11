import type { Meta, StoryObj } from "@storybook/react";
import { TokenSelectDialog } from "modules/token/token-select-dialog";
// import { mainnetDeployments } from "@axis-finance/deployments";
import { DialogRoot } from "@repo/ui";

const meta = {
  title: "Tokens/TokenSelectDialog",
  component: TokenSelectDialog,
  args: {
    chainId: 168587773,
  },
  decorators: [
    (Story) => (
      <DialogRoot open={true}>
        <Story />
      </DialogRoot>
    ),
  ],
} satisfies Meta<typeof TokenSelectDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
