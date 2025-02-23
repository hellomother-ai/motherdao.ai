import { Link } from "react-router-dom";
import AxisIcon from "./mother-icon";

export function NavigationIcon() {
  return (
    <Link
      className="flex cursor-pointer items-center gap-x-4 pl-4 text-4xl"
      to="/"
    >
      <div className="flex gap-x-2">
        <AxisIcon />
      </div>
    </Link>
  );
}
