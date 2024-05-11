import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { Main } from './components/Main/Main';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
