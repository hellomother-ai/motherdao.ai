import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@repo/ui";

const meta = {
  title: "Design System/Text",
  component: Text,
  decorators: (Story) => <Story />,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Good Ol' Text" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-x-6">
      <Container title="Font">
        <Text>Aeonik Pro - Sans/Default font</Text>
        <Text mono>Aeonik Fono - Mono font</Text>
      </Container>
      <Container title="Color">
        <Text className="mt-4">Primary</Text>
        <Text color="secondary">Secondary</Text>
      </Container>

      <Container title="Weight">
        <Text weight="bold">Bold</Text>
        <Text>Regular</Text>
        <Text weight="light">Light</Text>
      </Container>
      <Container title="Size">
        <Text size="3xl">Size=3xl</Text>
        <Text size="2xl">Size=2xl</Text>
        <Text>Size=default</Text>
        <Text size="sm">Size=sm</Text>
        <Text size="xs">Size=xs</Text>
      </Container>
    </div>
  ),
};

function Container(props: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="border-foreground space-y-3 border-l pl-2 first:border-l-0">
      <Text weight="bold" className="border-secondary border-b">
        {props.title}
      </Text>
      {props.children}
    </div>
  );
}
