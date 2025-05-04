import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import Home from "./pages/home.tsx";
import ErrorPage from "./pages/errorPage.tsx";
import CommunitiesPage from "./pages/communities.tsx";
import Member from "./pages/members.tsx";
import {ThemeProvider} from "./hooks/ThemeContext.tsx";
import {AuthenticationProvider} from "./hooks/AuthenticationContext.tsx";

const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage/>,
        errorElement: <ErrorPage />,
    },
    {
        path: '/communities',
        element: <CommunitiesPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/communities/:member',
                element: <Member/>
            }
        ]
    }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <AuthenticationProvider>
              <RouterProvider router={router}/>
          </AuthenticationProvider>
      </ThemeProvider>
  </StrictMode>,
)
