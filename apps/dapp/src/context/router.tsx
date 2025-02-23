import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import ErrorPage from "../pages/error-page";
import AuctionPage from "../pages/auction-page";
import App from "src/App";
import { FaucetPage } from "pages/faucet-page";
import { DeployTokenPage } from "pages/deploy-token-page";
import { BridgePage } from "pages/bridge-page";
import { PageBrancher } from "pages/page-brancher";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <PageBrancher /> },
      { path: "faucet", element: <FaucetPage /> },
      { path: "deploy", element: <DeployTokenPage /> },
      { path: ":chainId/:lotId", element: <AuctionPage /> },
      { path: "bridge", element: <BridgePage /> },
    ],
  },
]);

export default function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

export { RouterProvider };
