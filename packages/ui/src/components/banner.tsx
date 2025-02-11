import { Button } from "./primitives/button";
import { Text } from "./primitives/text";

type BannerProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  onClick?: () => void;
};

export function Banner({ title, subtitle, buttonText, onClick }: BannerProps) {
  return (
    <div className="bg-surface border-surface-highlight-outline gap-y-xs py-sm flex w-full flex-col items-center border">
      <Text mono weight="light" size="4xl">
        {title}
      </Text>
      <Text>{subtitle}</Text>
      <Button className="my-sm" variant="secondary" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
}
