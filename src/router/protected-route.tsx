import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { FC } from 'react';

type ProtectedRouteType = {
  element: JSX.Element;
  withAuth: boolean;
};
export const ProtectedRoute: FC<ProtectedRouteType> = ({ element, withAuth }) => {
  const auth = useAppSelector((state) => state.customer_slice.customerId);
  const location = useLocation();

  if (withAuth) {
    return !auth ? <Navigate to="/login" replace state={{ from: location }} /> : element;
  } else {
    return auth ? <Navigate to={'/'} replace /> : element;
  }
};
