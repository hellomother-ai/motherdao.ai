import type { Meta, StoryObj } from "@storybook/react";
import { ComboBox } from "@repo/ui";
import SelectStory from "./Select.stories";

const meta = {
  title: "Design System/ComboBox",
  component: ComboBox,
  args: {
    placeholder: "Select one",
    options: SelectStory.args?.options,
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
