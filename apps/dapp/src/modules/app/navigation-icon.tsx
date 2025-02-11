import { Link } from "react-router-dom";
import { LOGO_URL } from "../../../../../app-config";
import AxisIcon from "./axis-icon";

export function NavigationIcon() {
  return (
    <Link
      className="flex cursor-pointer items-center gap-x-4 pl-4 text-4xl"
      to="/"
    >
      <div className="flex gap-x-2">
        {LOGO_URL === "" ? (
          <AxisIcon />
        ) : (
          <img src={LOGO_URL} className="size-12 rounded-full" />
        )}
      </div>
    </Link>
  );
}
