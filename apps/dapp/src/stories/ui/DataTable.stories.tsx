import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@repo/ui";
import { createColumnHelper } from "@tanstack/react-table";

const column = createColumnHelper<unknown>();

const cols = [
  column.accessor("GM", {}),
  column.accessor("A long GM", {}),
  column.accessor("Also GM", {}),
  column.accessor("More GM", {}),
  column.accessor("Okay GN", {}),
];

const meta = {
  title: "Design System/DataTable",
  component: DataTable,
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    columns: cols,
    data: [],
  },
};
