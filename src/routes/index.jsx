import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CarsDetails from "../pages/CarsDetails";
import Edit from "../pages/Edit";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/cars/:id",
    element: <CarsDetails />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);
