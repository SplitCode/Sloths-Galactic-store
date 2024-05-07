import { useEffect } from 'react'; //only for test
import './App.css';
import { getProducts } from './api/apiRoot'; //only for test

function App() {
  // only for test
  useEffect(() => {
    getProducts()
      .then((result) => console.log(result))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <h1>Final task</h1>
    </>
  );
}

export default App;
