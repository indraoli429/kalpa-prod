/**
 * Component for base layout in application
 */

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Billing from "./Billing";
import NavSideBar from "./NavSideBar";

export default function AppLayout() {
//   function Layout() {
//     return (
//       <>
//         <NavSideBar />
//         <Outlet />
//       </>
//     );
//   }

//   const router = createBrowserRouter([
//     {
//       element: <Layout />,
//       children: [
//         {
//           path: "/",
//           element: <Billing />,
//         },
//       ],
//     },
//   ]);

  return (
    <div>
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}
