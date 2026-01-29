import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
 
import NavBar from "./components/NavBar.jsx";
 
const router = createBrowserRouter([
  
  {
      path: "/",
      element: <NavBar />,
      children: [
            { index: true, element: <HomePage /> },
            { path: "/fundraiser", element: <FundraiserPage /> },
        ],
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      {/* Here we wrap our app in the router provider so they render */}
      <RouterProvider router={router} />
    </React.StrictMode>
  );