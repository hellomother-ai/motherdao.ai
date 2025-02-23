import type { StoryObj } from "@storybook/react";
import { cn } from "@repo/ui";

const meta = {
  title: "Themes",
  component: ThemeVisualiser,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: { children: "Good Ol' Text" },
  render: () => {
    return (
      <div className="flex">
        <ThemeVisualiser />
        <ThemeVisualiser className="dark" />
      </div>
    );
  },
};
export const Light: Story = {};
export const Dark: Story = {
  args: { className: "dark" },
};

function ThemeVisualiser(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("w-[900px] space-y-6 font-mono", props.className)}>
      <ThemeComponents title="Base">
        <ColorVisualiser className="bg-background text-primary" />
      </ThemeComponents>

      <ThemeComponents title="Core">
        <ColorVisualiser className="bg-surface text-foreground" />
        <ColorVisualiser className="bg-surface-secondary text-foreground-secondary" />
        <ColorVisualiser className="bg-surface-tertiary text-foreground-tertiary" />
        <ColorVisualiser className="bg-surface text-foreground-disabled" />
        <ColorVisualiser className="bg-surface-highlight text-foreground-highlight" />
        <ColorVisualiser className="bg-surface-progress text-foreground-progress" />
      </ThemeComponents>

      <ThemeComponents title="Feedback">
        <ColorVisualiser className="bg-surface text-feedback-success" />
        <ColorVisualiser className="bg-surface text-feedback-warning" />
        <ColorVisualiser className="bg-surface text-feedback-alert" />
      </ThemeComponents>

      <ThemeComponents title="Brand">
        <ColorVisualiser className="bg-surface text-primary-500" />
        <ColorVisualiser className="bg-surface text-primary-600" />
        <ColorVisualiser className="bg-surface text-secondary-100" />
        <ColorVisualiser className="bg-surface text-secondary-200" />
        <ColorVisualiser className="bg-surface text-secondary-300" />
        <ColorVisualiser className="bg-surface text-secondary-400" />
        <ColorVisualiser className="bg-surface text-tertiary-200" />
        <ColorVisualiser className="bg-surface text-tertiary-300" />
        <ColorVisualiser className="bg-surface text-tertiary-500" />
        <ColorVisualiser className="bg-surface text-tertiary-600" />
      </ThemeComponents>

      <ThemeComponents title="Neutral">
        <ColorVisualiser className="bg-neutral-900 text-neutral-50" />
        <ColorVisualiser className="bg-neutral-900 text-neutral-100" />
        <ColorVisualiser className="bg-neutral-900 text-neutral-200" />
        <ColorVisualiser className="bg-neutral-900 text-neutral-300" />
        <ColorVisualiser className="bg-neutral-900 text-neutral-400" />
        <ColorVisualiser className="bg-neutral-900 text-neutral-500" />
        <ColorVisualiser className="bg-surface text-neutral-600" />
        <ColorVisualiser className="bg-surface text-neutral-650" />
        <ColorVisualiser className="bg-surface text-neutral-700" />
        <ColorVisualiser className="bg-surface text-neutral-800" />
        <ColorVisualiser className="bg-surface text-neutral-900" />
      </ThemeComponents>
    </div>
  );
}

function ThemeComponents(
  props: React.HTMLProps<HTMLDivElement> & { title?: string },
) {
  return (
    <div>
      <p className="text-lg">{props.title}</p>
      <div className="grid grid-cols-3 gap-2 ">{props.children}</div>
    </div>
  );
}

function ColorVisualiser(props: React.HTMLProps<HTMLDivElement>) {
  const [bg, fg] = props.className?.split(" ") ?? [];

  return (
    <div
      className={cn(
        "relative flex min-w-60 max-w-60 flex-col items-center justify-center text-nowrap px-4 py-8",
        props.className,
      )}
    >
      {fg?.substring(5)}
      <div className="absolute bottom-1 left-2 text-xs">{bg}</div>
    </div>
  );
}
