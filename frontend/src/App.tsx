import React, {useEffect} from 'react';
import './App.css';
import {CryptoChart} from "./components/crypto-chart/crypto-chart";
import {useAppDispatch} from "./utils/hooks/use-app-dispatch";
import {getAllCurrencies} from "./services/thunks/currencies";
import {CurrenciesTable} from "./components/currencies-table/currencies-table";

function App() {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getAllCurrencies())
    },[])
    return (
        <div className="App">
            <CurrenciesTable/>
        </div>
    );
}

export default App;
