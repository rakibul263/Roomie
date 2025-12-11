import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Hero from "../Components/Hero/Hero";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Roommate_Find from "../Components/Roommate_Find/Roommate_Find";
import Join_As_Roommate from "../Components/Join_As_Roommate/Join_As_Roommate";
import PrivateRoute from "./PrivateRoute";
import Error from "../Components/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: Hero,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/*",
        Component: Error,
      },
      {
        path: "findRoommate",
        loader: () => fetch("http://localhost:3000/roommate"),
        element: (
          <PrivateRoute>
            <Roommate_Find></Roommate_Find>
          </PrivateRoute>
        ),
      },
      {
        path: "JoinAsRoommate",
        loader: () => fetch("http://localhost:3000/userInfo"),
        element: (
          <PrivateRoute>
            <Join_As_Roommate></Join_As_Roommate>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
