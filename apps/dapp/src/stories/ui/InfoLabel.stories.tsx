import type { Meta, StoryObj } from "@storybook/react";
import { InfoLabel } from "@repo/ui";

const meta = {
  title: "Design System/InfoLabel",
  component: InfoLabel,
} satisfies Meta<typeof InfoLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: '"These are the best auctions of my life"',
    label: "Average Axis Enjoyooooor",
  },
};
