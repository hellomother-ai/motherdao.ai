import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@repo/ui";
import logo from "../assets/dai.png";

const meta = {
  title: "Design System/Avatar",
  component: Avatar,
  args: {
    alt: "AFX",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: logo,
  },
};

export const Fallback: Story = {};
