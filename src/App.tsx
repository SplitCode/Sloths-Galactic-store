import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { reloginCustomer } from './api/customers/reloginCustomer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Loader } from './components/Main/Loader/Loader';
import { deleteCustomer } from './store/slices/customer-slice';
import { BgPlanets } from './components/Sidebar/Bg-planets';
import { ThemeProvider } from './helpers/themeProvider';

export function App() {
  const dispatch = useAppDispatch();
  const { isCustomerLoading } = useAppSelector((state) => state.customer_slice);

  useEffect(() => {
    const refreshToken = localStorage.getItem('sloth-refreshToken');
    if (refreshToken) {
      dispatch(reloginCustomer());
    }
    dispatch(deleteCustomer());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <ToastContainer
        style={{ zIndex: 8, top: 'var(--header-height)' }}
        autoClose={2000}
        draggable
        theme="dark"
      />
      {isCustomerLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Main>
            <>
              <BgPlanets />
              <Outlet />
            </>
          </Main>
        </>
      )}
    </ThemeProvider>
  );
}
