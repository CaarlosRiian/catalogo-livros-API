import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Criar from './Criar';
import Editar from './Editar';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Aqui cria as rotas
const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
  },
  {
    path: "/criar",
    element: <Criar />,
  },
  {
    path: ":id/editar",
    element: <Editar />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
