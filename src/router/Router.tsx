import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import Landing from "../pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
]);
