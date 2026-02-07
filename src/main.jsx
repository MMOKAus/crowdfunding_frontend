import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx"
import CreateFundraiserPage from "./pages/CreateFundraiserPage.jsx";
import EditFundraiserPage from "./pages/EditFundraiserPage.jsx";



 
import NavBar from "./components/NavBar.jsx";
 
const router = createBrowserRouter([
  
  {
      path: "/",
      element: <NavBar />,
      children: [

            { index: true, element: <HomePage /> },
            { path: "/login", element: <LoginPage />},
            { path: "/signup", element: <SignUpPage />},
            { path: "/fundraiser/:id", element: <FundraiserPage /> },
            { path: "create", element: <CreateFundraiserPage /> },
            { path: "fundraisers/:id/edit", element: <EditFundraiserPage /> },

        ],
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      {/* Here we wrap our app in the router provider so they render */}
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  