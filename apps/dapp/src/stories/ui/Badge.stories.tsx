import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@repo/ui";
import icon from "../assets/ohm.png";

const meta = {
  title: "Design System/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "CURATOR",
    icon,
  },
};

export const TextOnly: Story = {
  args: {
    children: "CURATOR",
  },
};

export const Round: Story = {
  args: {
    children: 70,
    size: "round",
  },
};

export const CustomContent: Story = {
  args: {
    size: "lg",
    children: (
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm">Remaining</p>
        <p>00:04:20</p>
      </div>
    ),
  },
};
