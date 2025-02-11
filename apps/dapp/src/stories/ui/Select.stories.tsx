import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@repo/ui";
import daiIcon from "../assets/dai.png";
import ohmIcon from "../assets/ohm.png";
const options = [
  { value: "ohm", label: "OHM", imgURL: ohmIcon },
  { value: "dai", label: "DAI", imgURL: daiIcon },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Design System/Select",
  component: Select,
  args: {
    placeholder: "Select token",
    options,
  },
  decorators: (Story) => (
    <div className="w-[180px]">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
