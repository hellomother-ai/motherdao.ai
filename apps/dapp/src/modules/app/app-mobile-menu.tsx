import { CaretUpIcon } from "@radix-ui/react-icons";
import { environment } from "utils/environment";
import React from "react";
import Navbar, { testnetLinks } from "./navbar";
import { cn } from "@repo/ui";

export function AppMobileMenu() {
  const [open, setOpen] = React.useState<boolean>();

  const handleCloseMenu = () => setOpen(false);

  return (
    <div className="relative">
      <div
        className={cn(
          "bg-surface-tertiary absolute -left-40 bottom-[90px] mx-auto flex size-fit min-h-[300px] min-w-[200px] translate-x-[105%] flex-col items-end rounded-md p-2 px-8 pr-8 transition-all duration-300",
          open && "translate-x-0",
        )}
      >
        {environment.isTestnet && (
          <Navbar
            mobile
            links={testnetLinks}
            className="border-b-tertiary-300 border-b-2"
            onNavClick={handleCloseMenu}
          />
        )}
        <Navbar mobile showAll onNavClick={handleCloseMenu} />
      </div>
      <CaretUpIcon
        className={cn("mr-3 size-8 transition-all ", open && "-rotate-90")}
        onClick={() => setOpen((prev) => !prev)}
      />
    </div>
  );
}
