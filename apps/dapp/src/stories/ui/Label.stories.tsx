import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@repo/ui";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Design System/Label",
  component: Label,
  args: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "wen fix?",
  },
};

export const Tooltip: Story = {
  args: {
    children: "Hover me",
    tooltip:
      "Surprise SurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurpriseSurprise",
  },
};
