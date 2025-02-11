import type { Meta, StoryObj } from "@storybook/react";
import { Switch, Label } from "@repo/ui";

const meta = {
  title: "Design System/Switch",
  component: Switch,
  decorators: (Story) => <Story />,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <div className="grid grid-cols-2 place-items-center gap-x-4 gap-y-2">
      <Label>Unchecked</Label>
      <Label>Checked</Label>
      <Switch />
      <Switch checked />
    </div>
  ),
};
