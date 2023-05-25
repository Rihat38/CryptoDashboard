import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {mainStore} from "./services/store";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {CoinPage} from "./pages/coin-page/coin-page";
import {MainLayout} from "./components/layouts/main-layout/main-layout";
import {ProfilePage} from "./pages/profile-page/profile-page";
import {CurrenciesTable} from "./components/currencies-table/currencies-table";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <App/>,
                index: true,
            },
            {
                path: "/coins/:id",
                element: <CoinPage/>,
            },
            {
                path: "/profile",
                element: <ProfilePage/>,
                children: [
                    {
                        path: 'subscriptions',
                        element: <CurrenciesTable/>
                    },
                    {
                        path: 'predictions',
                        element: <CurrenciesTable/>
                    }
                ]
            },
        ]
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={mainStore}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
