import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@repo/ui";

const meta = {
  title: "Design System/Textarea",
  component: Textarea,
  decorators: [
    (Story) => (
      <div className="flex w-screen max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "Fitting for a long rant or something",
  },
};
