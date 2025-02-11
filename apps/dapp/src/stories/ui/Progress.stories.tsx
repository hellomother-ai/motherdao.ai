import type { Meta, StoryObj } from "@storybook/react";
import { Progress, Metric } from "@repo/ui";

const meta = {
  title: "Design System/Progress",
  component: Progress,
  args: {
    value: 50,
  },
  decorators: (Story) => (
    <div className="h-[100px] w-[480px]">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithMetric: Story = {
  args: {
    children: (
      <Metric size="m" label="Minimum Raise">
        $100,000,000
      </Metric>
    ),
  },
};
