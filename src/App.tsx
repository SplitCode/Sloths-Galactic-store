import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';

export function App() {
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
