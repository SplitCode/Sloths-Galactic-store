import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/Main/Login/Login';
import { Register } from '../components/Main/Register/Register';
import Home from '../components/Main/Home/Home';
import Catalog from '../components/Main/Catalog/Catalog';
import About from '../components/Main/About/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
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

export default router;
