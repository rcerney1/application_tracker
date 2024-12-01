import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import KanbanBoard from '../components/KanbanBoard';
import MyCoverLetters from '../components/MyCoverLetters/MyCoverLetters';
import CoverLetterDetailPage from '../components/CoverLetterDetailPage';

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginFormPage />
  },
  {
    path: "/signup",
    element: <SignupFormPage />
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
      {
        path: "/mycoverletters",
        element: <MyCoverLetters/>
      },
      {
        path: "/coverletters/:id",
        element: <CoverLetterDetailPage />
      }
    ],
  },
]);
