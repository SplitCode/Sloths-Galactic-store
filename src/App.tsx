import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { reloginCustomer } from './api/customers/reloginCustomer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Loader } from './components/Main/Loader/Loader';

export function App() {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customer_slice.customerId);
  const [isToken, setToken] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem('sloth-refreshToken');
    if (refreshToken) {
      setToken(true);
      reloginCustomer(dispatch);
    } else {
      setToken(false);
    }
  }, [dispatch, customer]);

  return !customer && isToken ? (
    <Loader />
  ) : (
    <>
      <ToastContainer autoClose={4000} draggable limit={5} theme="dark" />
      <Header />
      <Main>
        <>
          <Sidebar />
          <Outlet />
        </>
      </Main>
    </>
  );
}
