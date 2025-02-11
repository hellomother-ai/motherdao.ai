import type { Meta, StoryObj } from "@storybook/react";
import { IconedLabel } from "@repo/ui";
import logo from "../assets/dai.png";

const meta = {
  title: "Design System/IconedLabel",
  component: IconedLabel,
} satisfies Meta<typeof IconedLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "DAI",
    src: logo,
  },
};

export const Large: Story = {
  args: {
    label: "DAI",
    src: logo,
    large: true,
  },
};
