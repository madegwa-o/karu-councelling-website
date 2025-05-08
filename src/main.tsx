import './global-polyfill';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  ThemeContextProvider from "./hooks/themeProvider.tsx";
import {AuthenticationProvider} from "./hooks/AuthenticationContext.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BaseLayout from './BaseLayout.tsx';
import HomePage from './pages/home/homePage.tsx';
import {Settings} from "lucide-react";
import Login from "./pages/login/login.tsx";
import Register from "./pages/register/register.tsx";
import ErrorPage from "./pages/errorPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
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
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeContextProvider>
          <AuthenticationProvider>
              <RouterProvider router={router}/>
          </AuthenticationProvider>
      </ThemeContextProvider>
  </StrictMode>,
)
