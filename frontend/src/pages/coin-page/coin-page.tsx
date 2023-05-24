import {useParams} from "react-router-dom";
import {CryptoChart} from "../../components/crypto-chart/crypto-chart";
import {useAppDispatch} from "../../utils/hooks/use-app-dispatch";
import {getCurrencyDetailed, getCurrencyOHLC, getCurrencyOHLCForCompare, predict} from "../../services/thunks/currency";
import React, {useEffect} from "react";
import {clearCurrency, clearCurrencyOHLCForCompare} from "../../services/slices/currencies-ohlc";
import {AutoComplete, Button, Divider, Space} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {PredictionCard} from "../../components/ui/prediction-card/prediction-card";
import {CoinDetailsCard} from "../../components/ui/coin-details-card/coin-details-card";

export const CoinPage = () => {
    const {id} = useParams()
    const currencies = useAppSelector(state => state.currencies.currencies)
    const {predicted} = useAppSelector(state => state.currencyOhlc)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id){
            dispatch(getCurrencyOHLC(id))
            dispatch(getCurrencyDetailed(id))
        }
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearCurrency())
        }
    }, [])

    useEffect(() => {
        console.log(predicted)
    }, [predicted])

    const handleChange = (value: string, option: { label: string, value: string } | {
        label: string,
        value: string
    }[]) => {
        if ((option as { label: string, value: string }).value) {
            console.log(value, option)
            dispatch(getCurrencyOHLCForCompare(value))
        } else if (value === '') {
            dispatch(clearCurrencyOHLCForCompare())
        }
    }

    const handleClick = () => {
        if (id && currencies?.find(el => el.id === id))
            dispatch(predict(id))
    }

    return (
        <>
            <CoinDetailsCard/>
            <Divider/>
            <CryptoChart/>
            <Divider/>
            {currencies && <AutoComplete
                size={'large'}
                className={'m-4'}
                style={{width: '100%'}}
                placeholder={'Сравнить с'}
                options={currencies.map(el => ({label: el.name, value: el.id}))}
                onChange={handleChange}
                filterOption={(inputValue, option) =>
                    option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            }
            <Divider/>
            <Space>
                <Button size={"large"} type={"primary"} onClick={handleClick}>
                    Сделать прогноз
                </Button>
                {predicted.length > 0 && <PredictionCard/>}
            </Space>
        </>
    )
}