import type { Meta, StoryObj } from "@storybook/react";
import { IconnedInput, Input, GlobeIcon } from "@repo/ui";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Design System/Input",
  component: Input,
  args: {
    placeholder: "Enter quantity to bid",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};

export const WithIcon: Story = {
  render: (args) => (
    <IconnedInput {...args} icon={<GlobeIcon className="h-6 w-6" />} />
  ),
};

export const Large: Story = {
  args: {
    variant: "lg",
    placeholder: "0.00",
  },
};
