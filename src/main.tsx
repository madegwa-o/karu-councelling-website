import './global-polyfill';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  ThemeContextProvider from "./hooks/themeProvider.tsx";
import {AuthenticationProvider} from "./hooks/AuthenticationContext.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import BaseLayout from './BaseLayout.tsx';
import HomePage from './pages/home/homePage.tsx';
import {Settings} from "lucide-react";
import Login from "./pages/login/login.tsx";
import Register from "./pages/register/register.tsx";
import ErrorPage from "./pages/errorPage.tsx";
import Counsellors from "./components/counsellors/counsellors.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/:filter',
                element: <HomePage />,
                errorElement: <ErrorPage />,
            },

            {
                path: '/counsellors/:role',
                element: <Counsellors />,
                errorElement: <ErrorPage />,
            },

            {
                path: '/settings',
                element: <Settings />,
                errorElement: <ErrorPage />,
            }
        ]
    },
    // Login and Register routes outside of the BaseLayout
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);


createRoot(document.getElementById('root')!).render(

      <ThemeContextProvider>
          <AuthenticationProvider>
              <RouterProvider router={router}/>
          </AuthenticationProvider>
      </ThemeContextProvider>
)
