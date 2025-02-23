import "./index.css";
import "./polyfills.ts";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "./context/router.tsx";
import { ThemeProvider } from "@repo/ui";
import { initializeVerifiedFetch } from "utils/verified-fetch";

initialize().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </React.StrictMode>,
  );
});

async function initialize() {
  await initializeVerifiedFetch();
}
