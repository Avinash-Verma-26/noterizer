import { createBrowserRouter } from "react-router";
import Login from "./features/Auth/pages/Login";
import Register from "./features/Auth/pages/Register";
import Protected from "./features/Auth/components/Protected";
import GuestOnly from "./features/Auth/components/GuestOnly";
import Homepage from "./features/Auth/pages/Homepage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestOnly>
        <Register />
      </GuestOnly>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <Homepage />
      </Protected>
    ),
  },
]);
