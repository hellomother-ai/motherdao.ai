import { allowedCurators } from "modules/app/curators";
import { useLocation, useParams } from "react-router-dom";
const curatorIds = allowedCurators.map((c) => c.id);

export function useCuratorPage() {
  const params = useParams();
  const location = useLocation();
  const isCuratorPage = curatorIds.some((id) => location.pathname.includes(id));
  const curator = allowedCurators.find((c) => c.id === params.curatorId);

  return {
    isCuratorPage,
    curator,
  };
}
