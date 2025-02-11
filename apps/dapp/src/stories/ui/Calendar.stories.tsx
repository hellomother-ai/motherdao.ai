import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@repo/ui";

const meta = {
  title: "Design System/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
