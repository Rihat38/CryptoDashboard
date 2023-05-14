import React, {useState, useEffect} from 'react';
import {Line, LineConfig} from '@ant-design/plots';
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {useAppDispatch} from "../../utils/hooks/use-app-dispatch";
import {getCurrencyOHLC} from "../../services/thunks/currency";

export const CryptoChart = (): JSX.Element => {
    const currencyOHLC = useAppSelector(state => state.currencyOhlc.currencyOHLC)
    const [config, setConfig] = useState<LineConfig>()

    useEffect(() => {
        if (currencyOHLC) {
            const config: LineConfig = {
                data: currencyOHLC,
                xField: 'time',
                yField: 'price',
                seriesField: 'name',
                legend: {
                    position: 'top',
                },
                animation: {
                    appear: {
                        animation: 'path-in',
                        duration: 5000,
                    },
                },
            };
            setConfig(config)
        }
    }, [currencyOHLC])


    return (
        <>
            {config && <Line {...config} />}
        </>
    );
};