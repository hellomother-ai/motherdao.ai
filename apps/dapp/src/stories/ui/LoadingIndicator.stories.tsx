import type { Meta, StoryObj } from "@storybook/react";
import { LoadingIndicator } from "modules/app/loading-indicator";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Design System/LoadingIndicator",
  component: LoadingIndicator,
  args: {},
} satisfies Meta<typeof LoadingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "wen fix?",
  },
};
