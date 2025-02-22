import { Text, cn } from "@repo/ui";

type PageContainerProps = {
  title?: React.ReactNode;
  className?: string;
  containerClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function PageContainer(props: PageContainerProps) {
  return (
    <div
      id={props.id}
      className={cn(
        "max-w-limit mx-auto bg-black pb-20 pt-2 text-white lg:pb-0 lg:pt-6",
        props.className,
      )}
    >
      {props.title && (
        <Text size="lg" className="mb-8 ml-2 text-white lg:ml-0">
          {props.title}{" "}
        </Text>
      )}
      <div
        className={cn(
          "mx-auto flex flex-col gap-y-4 text-white",
          props.containerClassName,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
