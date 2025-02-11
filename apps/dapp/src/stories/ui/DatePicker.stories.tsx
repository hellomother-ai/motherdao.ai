import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@repo/ui";

const meta = {
  title: "Design System/DatePicker",
  component: DatePicker,
  args: {
    content: "Click to view a date picker",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
