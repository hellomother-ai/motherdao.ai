import { UsdToggle, cn } from "@repo/ui";

type PageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  backNavigationPath?: string;
  backNavigationText?: string;
  toggle?: boolean;
  toggleSymbol?: string;
};

export function PageHeader({
  className,
  backNavigationPath,
  children,
  toggle,
  toggleSymbol = "Quote",
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 grid-rows-2 items-center justify-between justify-items-center gap-y-4 lg:my-5 lg:mt-2 lg:flex lg:justify-center",
        className,
        backNavigationPath && "lg:justify-between",
      )}
    >
      <div className="col-span-2 row-start-2 mx-auto ">{children}</div>

      {toggle && (
        <div className="flex w-full items-center justify-end lg:w-1/5 lg:pr-0">
          {<UsdToggle currencySymbol={toggleSymbol} />}
        </div>
      )}
    </div>
  );
}
