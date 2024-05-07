import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const rootElement = document.getElementById('root');
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
]);

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
