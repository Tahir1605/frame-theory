import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPage from './pages/AdminPage'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Gallery from './pages/Gallery'
import Members from './pages/Members'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AdminPage />
      }, {
        path: '/gallery',
        element: <Gallery />
      },
      {
        path: '/members',
        element: <Members />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
