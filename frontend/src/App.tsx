import React, {useEffect} from 'react';
import './App.css';
import {CryptoChart} from "./components/crypto-chart/crypto-chart";
import {useAppDispatch} from "./utils/hooks/use-app-dispatch";
import {getAllCurrencies} from "./services/thunks/currencies";
import {CurrenciesTable} from "./components/currencies-table/currencies-table";
import {CurrenciesRankCard} from "./components/currencies-rank-card/currencies-rank-card";
import {Divider} from "antd";

function App() {

    return (
        <div className="App">
            <CurrenciesRankCard/>
            <Divider/>
            <CurrenciesTable/>
        </div>
    );
}

export default App;
