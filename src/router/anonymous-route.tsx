import { useAppSelector } from '../store/hooks';
import { Navigate } from 'react-router-dom';
import type { FC } from 'react';
import type { RouteType } from './protected-route';

export const AnonymousRoute: FC<RouteType> = ({ element }) => {
  const auth = useAppSelector((state) => state.customer_slice.customerId);
  return auth ? <Navigate to={'/'} replace /> : element;
};
