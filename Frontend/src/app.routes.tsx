import { createBrowserRouter } from "react-router";
import Login from "./features/Auth/pages/Login";
import Register from "./features/Auth/pages/Register";
import Protected from "./features/Auth/components/Protected";
import GuestOnly from "./features/Auth/components/GuestOnly";
import Homepage from "./features/Homepage/pages/Homepage";
import { UserProvider } from "./features/Homepage/user.context";

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
        <UserProvider>
          <Homepage />
        </UserProvider>
      </Protected>
    ),
  },
]);
