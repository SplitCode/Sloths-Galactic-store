import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { FC } from 'react';

export type RouteType = {
  element: JSX.Element;
};
export const ProtectedRoute: FC<RouteType> = ({ element }) => {
  const auth = useAppSelector((state) => state.customer_slice.customerId);
  const location = useLocation();
  return auth ? element : <Navigate to="/login" replace state={{ from: location }} />;
};
