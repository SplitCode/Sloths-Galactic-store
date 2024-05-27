import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../components/Main/Login/Login';
import { Register } from '../components/Main/Register/Register';
import { ErrorPage } from '../components/Main/Error/Error-page';
import { Home } from '../components/Main/Home/Home';
import { Catalog } from '../components/Main/Catalog/Catalog';
import { About } from '../components/Main/About/About';
import { App } from '../App';
import { ProtectedRoute } from './protected-route';
import { Profile } from '../components/Main/Profile/Profile';
import { AnonymousRoute } from './anonymous-route';
import { ProductDetail } from '../components/Main/ProductDetail/ProductDetail';

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
        element: <AnonymousRoute element={<Login />} />
      },
      {
        path: '/register',
        element: <AnonymousRoute element={<Register />} />
      },
      {
        path: '/catalog',
        element: <Catalog />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<Profile />} />
      },
      {
        path: '/product/:productKey',
        element: <ProductDetail />
      }
    ]
  }
]);
