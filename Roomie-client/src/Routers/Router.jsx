import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Hero from "../Components/Hero/Hero";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Roommate_Find from "../Components/Roommate_Find/Roommate_Find";
import Join_As_Roommate from "../Components/Join_As_Roommate/Join_As_Roommate";
import PrivateRoute from "./PrivateRoute";
import Error from "../Components/Error/Error";
import Details from "../Components/Details/Details";
import MyList from "../MyList/MyList";
import Profile from "../Components/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // 🔥 Component → element fixed
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "profile",
        loader: () => fetch("https://roomie-server-six.vercel.app/roommate"),
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "details/:id",
        loader: ({ params }) =>
          fetch(`https://roomie-server-six.vercel.app/roommate/${params.id}`),
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },

      {
        path: "mylist",
        loader: () => fetch("https://roomie-server-six.vercel.app/mylist"),
        element: (
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        ),
      },

      {
        path: "findRoommate",
        loader: () => fetch("https://roomie-server-six.vercel.app/roommate"),
        element: (
          <PrivateRoute>
            <Roommate_Find />
          </PrivateRoute>
        ),
      },

      {
        path: "JoinAsRoommate",
        loader: () => fetch("https://roomie-server-six.vercel.app/userInfo"),
        element: (
          <PrivateRoute>
            <Join_As_Roommate />
          </PrivateRoute>
        ),
      },

      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
]);
