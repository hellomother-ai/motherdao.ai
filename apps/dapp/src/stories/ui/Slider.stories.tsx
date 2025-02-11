import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@repo/ui";

const meta = {
  title: "Design System/Slider",
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "w-[400px]",
    defaultValue: [50],
  },
};
