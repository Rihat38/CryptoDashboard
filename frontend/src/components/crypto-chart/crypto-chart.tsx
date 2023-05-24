import React, {useState, useEffect} from 'react';
import {Line, LineConfig} from '@ant-design/plots';
import {useAppSelector} from "../../utils/hooks/use-app-selector";

export const CryptoChart = (): JSX.Element => {
    const {currencyOHLC,compareCurrencyOHLC} = useAppSelector(state => state.currencyOhlc)

    const [config, setConfig] = useState<LineConfig>()

    useEffect(() => {
        if (currencyOHLC) {
            const config: LineConfig = {
                data: [...currencyOHLC, ...compareCurrencyOHLC],
                xField: 'time',
                yField: 'price',
                seriesField: 'name',
                legend: {
                    position: 'top',
                },
                animation: {
                    appear: {
                        animation: 'path-in',
                        duration: 1000,
                    },
                },
            };
            setConfig(config)
        }
    }, [currencyOHLC,compareCurrencyOHLC])

    return (
        <>
            {config && <Line {...config} />}
        </>
    );
};