import { createBrowserRouter, Link } from 'react-router-dom';
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
import type { Subcategories } from '../helpers/translationMapper';
import { getTranslation } from '../helpers/translationMapper';
import type { Planets } from '../store/slices/planet-slice';
import { Basket } from '../components/Main/Basket/Basket';

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
        path: 'login',
        element: <AnonymousRoute element={<Login />} />
      },
      {
        path: 'register',
        element: <AnonymousRoute element={<Register />} />
      },
      {
        path: 'catalog',
        element: <Catalog />,
        children: [
          {
            path: ':planet',
            element: <Catalog />,
            loader: ({ params }) => params,
            handle: {
              crumb: (data: { planet: Planets }) => (
                <Link to={`/catalog/${data.planet}`}>{getTranslation(data.planet)}</Link>
              )
            },
            children: [
              {
                path: ':subcategory',
                element: <Catalog />,
                loader: ({ params }) => params,
                handle: {
                  crumb: (data: { planet: Planets; subcategory: Subcategories }) => (
                    <Link to={`/catalog/${data.planet}/${data.subcategory}`}>
                      {getTranslation(data.subcategory)}
                    </Link>
                  )
                }
              }
            ]
          }
        ]
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'profile',
        element: <ProtectedRoute element={<Profile />} />
      },
      {
        path: 'catalog/:planet/:subcategory/:productKey',
        element: <ProductDetail />
      },
      {
        path: 'basket',
        element: <Basket />
      }
    ]
  }
]);
