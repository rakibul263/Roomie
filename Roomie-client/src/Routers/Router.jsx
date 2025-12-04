import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Hero from "../Components/Hero/Hero";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: Hero,
      },
    ],
  },
]);
