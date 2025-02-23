import Navbar from "./navbar";
import { ThemeSwitcher } from "@repo/ui";
import { useMediaQueries } from "loaders/use-media-queries";
import { NavigationIcon } from "./navigation-icon";
import ConnectButton from "components/connect-button";

export function AppControl() {
  const { isTabletOrMobile } = useMediaQueries();

  return (
    <div className="lg:max-w-limit fixed bottom-0 z-20 mx-auto w-full bg-neutral-50 lg:static lg:bg-transparent">
      <div className="mx-auto flex max-h-[64px] justify-between py-6 lg:max-h-[88px]">
        <div className="flex gap-x-3">
          <NavigationIcon />
          <Navbar onlyDefault={isTabletOrMobile} />
        </div>
        <div className="flex items-center justify-between gap-x-2 ">
          <ConnectButton />
          <div className="min-w-[60px] px-2">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
