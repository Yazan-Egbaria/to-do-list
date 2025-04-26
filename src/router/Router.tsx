import { createBrowserRouter } from "react-router";

export const router = [
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
];
