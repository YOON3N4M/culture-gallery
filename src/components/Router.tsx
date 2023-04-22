import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  HashRouter,
} from "react-router-dom";
import App from "./App";
import Main from "../components/Main";
import Explore from "./Explore";
import Welcome from "./Welcome";

function useRouter() {
  const newRouter = createBrowserRouter(
    [
      {
        path: `/`,
        element: <App />,
        children: [
          {
            path: `/`,
            element: <Welcome />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: `${"/:uid"}`,
            element: <Main />,
          },
        ],
      },
    ],
    {
      basename: process.env.PUBLIC_URL,
    }
  );
  return newRouter;
}

function Router() {
  const router = useRouter();
  return <RouterProvider router={router} />;
}

export default Router;
