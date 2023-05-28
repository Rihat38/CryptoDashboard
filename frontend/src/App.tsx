import React from 'react';
import './App.css';
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
