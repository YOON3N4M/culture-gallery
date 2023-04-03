import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function useRouter() {
  const newRouter = createBrowserRouter(
    [
      {
        path: `/`,
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/auth",
            element: <Auth />,
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
