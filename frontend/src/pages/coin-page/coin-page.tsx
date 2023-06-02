import {useParams} from "react-router-dom";
import {CryptoChart} from "../../components/crypto-chart/crypto-chart";
import {useAppDispatch} from "../../utils/hooks/use-app-dispatch";
import {getCurrencyDetailed, getCurrencyOHLC, getCurrencyOHLCForCompare, predict} from "../../services/thunks/currency";
import React, {useEffect} from "react";
import {clearCurrency, clearCurrencyOHLCForCompare} from "../../services/slices/currencies-ohlc";
import {AutoComplete, Divider, Space} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {CoinDetailsCard} from "../../components/ui/coin-details-card/coin-details-card";
import {CoinMarketCard} from "../../components/ui/coin-market-card/coin-market-card";
import {PredictionCard} from "../../components/ui/prediction-card/prediction-card";

import styles from './coin-page.module.css'

export const CoinPage = () => {
    const {id} = useParams()
    const currencies = useAppSelector(state => state.currencies.currencies)
    const dispatch = useAppDispatch();
    const {predicted} = useAppSelector(state => state.currencyOhlc)

    useEffect(() => {
        if (id) {
            dispatch(getCurrencyOHLC(id))
            dispatch(getCurrencyDetailed(id))
        }
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearCurrency())
        }
    }, [])

    const handleChange = (value: string, option: { label: string, value: string } | {
        label: string,
        value: string
    }[]) => {
        if ((option as { label: string, value: string }).value) {
            dispatch(getCurrencyOHLCForCompare(value))
        } else if (value === '') {
            dispatch(clearCurrencyOHLCForCompare())
        }
    }

    return (
        <>
            <div className={styles.cardsWrapper}>
                <div className={styles.detailsCardWrapper}>
                    <CoinDetailsCard/>
                    <div className={styles.predictionCardWrapper}>
                        {predicted.length > 0 && <PredictionCard/>}
                    </div>
                </div>
                <div className={styles.marketCardWrapper}>
                    <CoinMarketCard/>
                </div>
            </div>
            <Divider/>
            <CryptoChart/>
            <Divider/>
            {currencies && <AutoComplete
                size={'large'}
                className={'m-4'}
                style={{width: '100%'}}
                placeholder={'Сравнить с'}
                options={currencies.filter(el=>el.id!==id).map(el => ({label: el.name, value: el.id}))}
                onChange={handleChange}
                filterOption={(inputValue, option) =>
                    option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            }
        </>
    )
}