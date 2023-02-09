import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App';
import MovieDetails from './components/movieDetails/movieDetails';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store/root';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "movieDetails/:movieType/:movieId",
    element: <MovieDetails />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <script src="//r.dcs.redcdn.pl/file/o2/web/player/redcdn/2.33.0/js/redgalaxy-player-2.33.0.min.js" type="text/javascript"></script>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
