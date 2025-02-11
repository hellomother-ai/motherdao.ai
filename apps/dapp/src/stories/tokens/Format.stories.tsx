import type { Meta, StoryObj } from "@storybook/react";
import { Format } from "modules/token/format";

const meta = {
  title: "Tokens/Format",
  component: Format,
} satisfies Meta<typeof Format>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <div className="flex flex-col">
      <div>
        <Format value={"100000000"} />
      </div>
      <div>
        <Format value={"10000000"} />
      </div>
      <div>
        <Format value={"1000000"} />
      </div>
      <div>
        <Format value={"100000"} />
      </div>
      <div>
        <Format value={"10000"} />
      </div>
      <div>
        <Format value={"100"} />
      </div>
      <div>
        <Format value={"10"} />
      </div>
      <div>
        <Format value={"1.1235"} />
      </div>
      <div>
        <Format value={"1.123"} />
      </div>
      <div>
        <Format value={"1.12"} />
      </div>
      <div>
        <Format value={"1.1"} />
      </div>
      <div>
        <Format value={"1"} />
      </div>
      <div>
        <Format value={"0.1"} />
      </div>
      <div>
        <Format value={"0.01"} />
      </div>
      <div>
        <Format value={"0.001"} />
      </div>
      <div>
        <Format value={"0.0001"} />
      </div>
      <div>
        <Format value={"0.00005"} />
      </div>
      <div>
        <Format value={"0.00021"} />
      </div>
      <div>
        <Format value={"0.000008"} />
      </div>
      <div>
        <Format value={"0.000321"} />
      </div>
      <div>
        <Format value={"0.0000006"} />
      </div>
      <div>
        <Format value={"0.0000320"} />
      </div>
    </div>
  ),
};
