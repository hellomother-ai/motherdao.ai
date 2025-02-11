import type { Meta, StoryObj } from "@storybook/react";
import { DialogInput } from "@repo/ui";
// import { Primary as SelectStory } from "./Select.stories";
import logo from "../assets/dai.png";

const meta = {
  title: "Design System/DialogInput",
  component: DialogInput,
  args: {
    triggerContent: "Click to Pick",
    title: "This allows you to pick a value",
    children: <>Whatever you pick here will be displayed</>,
  },
} satisfies Meta<typeof DialogInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Filled: Story = {
  args: {
    display: {
      label: "DAI",
      imgURL: logo,
    },
  },
};
