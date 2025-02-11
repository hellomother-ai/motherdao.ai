import "./index.css";
import "./polyfills.ts";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "./context/router.tsx";
import { ThemeProvider } from "@repo/ui";
import { environment } from "utils/environment";
import { initializeVerifiedFetch } from "utils/verified-fetch";

// Cypress tests run the app with a mock service worker backend (msw)
async function enableBackendMocking() {
  if (!environment.isMockBackend) {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  return worker.start();
}

async function initialize() {
  await initializeVerifiedFetch();
  await enableBackendMocking();
}

initialize().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </React.StrictMode>,
  );
});
