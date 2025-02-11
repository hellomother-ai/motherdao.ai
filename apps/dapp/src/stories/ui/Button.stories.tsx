import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui";

const meta = {
  title: "Design System/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 bg-white p-5">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Sm</Button>
      <Button size="lg">Lg</Button>
      <Button size="icon">Icon</Button>
    </div>
  ),
};
