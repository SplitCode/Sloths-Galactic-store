import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../components/Main/Login/Login';
import { Register } from '../components/Main/Register/Register';
import { ErrorPage } from '../components/Main/Error/Error-page';
import { Home } from '../components/Main/Home/Home';
import { Catalog } from '../components/Main/Catalog/Catalog';
import { About } from '../components/Main/About/About';
import { App } from '../App';
import { ProtectedRoute } from './protected-route';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <ProtectedRoute element={<Login />} withAuth={false} />
      },
      {
        path: '/register',
        element: <ProtectedRoute element={<Register />} withAuth={false} />
      },
      {
        path: '/catalog',
        element: <Catalog />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
]);
