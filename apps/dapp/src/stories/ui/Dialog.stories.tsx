import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@repo/ui";

const meta = {
  title: "Design System/Dialog",
  component: Dialog,
  args: {
    triggerContent: "Bid",
    title: "Confirm Bid",
    description: "This action cannot be undone",
    children: <div className="py-4 text-center">dialog content</div>,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithCancel: Story = {
  args: {
    cancelText: "Go Back",
  },
};
