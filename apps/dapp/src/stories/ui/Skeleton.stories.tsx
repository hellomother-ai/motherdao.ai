import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@repo/ui";

const meta = {
  title: "Design System/Skeleton",
  component: Skeleton,
  decorators: (Story) => <Story />,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "w-[400px] h-[300px]",
  },
};

export const Happy: Story = {
  args: {
    className: "w-20 h-10",
  },
  render: () => (
    <div className="grid grid-cols-2 place-items-center">
      <Skeleton className="size-12 rounded-full" />
      <Skeleton className="size-12 rounded-full" />
      <Skeleton
        className="col-span-2 mt-4"
        style={{
          borderRadius: "200px 200px 0 0",
          width: "100px",
          height: "100px",
          rotate: "180deg",
        }}
      />
    </div>
  ),
};
