import { cn } from "..";
import { Avatar } from "./primitives/avatar";

type IconedLabelProps = React.PropsWithChildren<{
  src?: string;
  label?: string;
  large?: boolean;
  alt?: string;
}>;

export function IconedLabel(props: IconedLabelProps) {
  return (
    <div className="flex items-center justify-start gap-x-2">
      <Avatar
        src={props.src}
        alt={props.alt ?? props.label}
        className={cn(props.large && "size-12")}
      />
      <p className={cn(props.large && "text-3xl font-light")}>
        {props.label ?? props.children}
      </p>
    </div>
  );
}
