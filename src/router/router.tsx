import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/Main/Login/Login';
import { Register } from '../components/Main/Register/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default router;
