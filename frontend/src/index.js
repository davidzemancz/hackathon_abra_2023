import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import SeznamPravidel from './SeznamPravidel';
import DetailPravidla from './DetailPravidla';
import RozuctovaniFaktury from './RozuctovaniFaktury';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RozuctovaniFaktury/>,
  },
  {
    path: "/pravidla",
    element: <SeznamPravidel/>

  },
  {
    path: "/pravidlo/:id",
    element: <DetailPravidla/>

  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
