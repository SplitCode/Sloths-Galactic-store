import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';

export function App() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
