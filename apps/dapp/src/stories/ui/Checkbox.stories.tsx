import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@repo/ui";

const meta = {
  title: "Design System/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
