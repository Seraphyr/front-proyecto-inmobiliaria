import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Editar from './components/Editar';
import Register from './components/Register';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/editar/:id',
    element: <Editar/>,
  },
  {
    path: '/register',
    element: <Register/>,
  }

])


ReactDOM.createRoot(document.getElementById('root'), HTMLElement).render(
  <RouterProvider router={router} />
);
