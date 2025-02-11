import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@repo/ui";

const meta = {
  title: "Design System/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <div className="">i'm content inside a card</div>,
  },
};

export const Title: Story = {
  args: {
    title: "Title",
    children: Primary.args.children,
  },
};

export const HeaderElement: Story = {
  args: {
    ...Title.args,
    headerRightElement: "Right Element",
  },
};

export const HeaderElementOnly: Story = {
  args: {
    ...Primary.args,
    ...HeaderElement.args,
    title: "",
  },
};
