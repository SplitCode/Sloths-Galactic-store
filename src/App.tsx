import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { reloginCustomer } from './api/customers/reloginCustomer';
import { useAppDispatch } from './store/hooks';

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refreshToken = localStorage.getItem('sloth-refreshToken');
    if (refreshToken) {
      reloginCustomer(dispatch);
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer autoClose={4000} draggable limit={5} theme="dark" />
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
