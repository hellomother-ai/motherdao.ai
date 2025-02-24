import { Link } from "@repo/ui";
import AxisIcon from "./mother-icon";
import { WEBSITE_URL } from "../../../../../app-config";

export function NavigationIcon() {
  return (
    <Link
      href={WEBSITE_URL}
      className="flex cursor-pointer items-center gap-x-4 pl-4 text-4xl"
    >
      <div className="flex gap-x-2">
        <AxisIcon />
      </div>
    </Link>
  );
}
