import { FlaskConicalIcon } from "lucide-react";
import Navbar, { testnetLinks } from "./navbar";
import { ThemeSwitcher, Tooltip } from "@repo/ui";
import { useMediaQueries } from "loaders/use-media-queries";
import { environment } from "utils/environment";
import { AppMobileMenu } from "./app-mobile-menu";
import { NavigationIcon } from "./navigation-icon";
import ConnectButton from "components/connect-button";

export function AppControl() {
  const { isTabletOrMobile } = useMediaQueries();

  return (
    <div className="lg:max-w-limit bg-surface-tertiary fixed bottom-0 z-20 mx-auto w-full lg:static lg:bg-transparent">
      <div className="mx-auto flex max-h-[64px] justify-between py-6 lg:max-h-[88px]">
        <div className="flex gap-x-3">
          <NavigationIcon />
          <Navbar onlyDefault={isTabletOrMobile} />
        </div>
        <div className="flex items-center justify-between gap-x-2 ">
          {environment.isTestnet && !isTabletOrMobile && (
            <div className="border-b-tertiary-300 mr-8 flex items-center border-b-2">
              <Tooltip content="These features are only available on testnet">
                <div className="w-8">
                  <FlaskConicalIcon width={24} height={24} />
                </div>
              </Tooltip>
              <Navbar links={testnetLinks} />
            </div>
          )}

          {!isTabletOrMobile && <ConnectButton />}
          {isTabletOrMobile && <AppMobileMenu />}
          {!isTabletOrMobile && (
            <div className="w-1/6">
              <ThemeSwitcher />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
