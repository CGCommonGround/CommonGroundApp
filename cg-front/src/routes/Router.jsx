import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import CreatePage from "../pages/Create";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout />,
        children:[
            {path: "", element:<Home />},
            {path:"/profile", element:<ProfilePage />},
            {path: "/create", element: <CreatePage />},
            {path:"/*", element:<Navigate to={"/"}/>}

        ]
    }
])