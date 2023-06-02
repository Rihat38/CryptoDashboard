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
import {UserFavoritesTable} from "./components/currencies-table/currencies-table";
import {RegistrationPage} from "./pages/auth/registration/registration-page";
import {LoginPage} from "./pages/auth/login/login-page";
import {OnlyAuth, OnlyUnAuth} from "./components/protected-route/protected-route";
import {PredictionsTable} from "./components/user-prediction-table/user-prediction-table";

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
                path: "/registration",
                element: <OnlyUnAuth element={<RegistrationPage/>}/>,
            },
            {
                path: "/login",
                element: <OnlyUnAuth element={<LoginPage/>}/>,
            },
            {
                path: "/profile",
                element: <OnlyAuth element={<ProfilePage/>}/>,
                children: [
                    {
                        path: 'subscriptions',
                        element: <UserFavoritesTable/>
                    },
                    {
                        path: 'predictions',
                        element: <PredictionsTable/>
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
