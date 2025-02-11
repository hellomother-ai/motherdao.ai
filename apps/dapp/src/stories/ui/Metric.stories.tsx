import type { Meta, StoryObj } from "@storybook/react";
import { Metric } from "@repo/ui";

const meta = {
  title: "Design System/Metric",
  component: Metric,
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Total Aphexed Amount",
    children: "$420,000,069",
  },
};
