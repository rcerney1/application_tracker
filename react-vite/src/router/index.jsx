import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import KanbanBoard from '../components/KanbanBoard';

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginFormPage />, // LoginFormPage route outside of Layout
  },
  {
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/myjobtracker", 
        element: <KanbanBoard/>,
      },
    ],
  },
]);
