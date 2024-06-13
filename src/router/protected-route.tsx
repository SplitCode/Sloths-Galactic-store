import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { FC } from 'react';
import { Loader } from '../components/Main/Loader/Loader';

export type RouteType = {
  element: JSX.Element;
};
export const ProtectedRoute: FC<RouteType> = ({ element }) => {
  const { customerId, isCustomerLoading, isUnknownStatus } = useAppSelector((state) => state.customer_slice);
  const location = useLocation();
  if (isCustomerLoading || isUnknownStatus) {
    return <Loader />;
  } else {
    return customerId ? element : <Navigate to="/login" replace state={{ from: location }} />;
  }
};
