import { Link } from "@repo/ui";
import MotherIcon from "./mother-icon";
import { WEBSITE_URL } from "../../../../../app-config";
import { ArrowLeftIcon } from "lucide-react";

export function NavigationIcon() {
  return (
    <Link
      href={WEBSITE_URL}
      className="flex cursor-pointer items-center gap-x-4 pl-4 text-4xl"
    >
      <div className="flex items-center gap-x-2">
        <ArrowLeftIcon className="size-6" />
        <MotherIcon />
      </div>
    </Link>
  );
}
