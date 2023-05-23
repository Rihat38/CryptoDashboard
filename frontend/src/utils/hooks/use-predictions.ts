import {useAppSelector} from "./use-app-selector";
import {useEffect, useState} from "react";
import {ICurrencyOHLC} from "../types";

export const usePredictions = () => {
    const {predicted} = useAppSelector(state => state.currencyOhlc)

    const [predictions, setPredictions] = useState<{
        tomorrow?: ICurrencyOHLC,
        week?: ICurrencyOHLC,
        month?: ICurrencyOHLC,
    }>({
        tomorrow: undefined,
        week: undefined,
        month: undefined,
    })

    const getNextPredictions = (predicted: ICurrencyOHLC[]) => {
        return {
            tomorrow: predicted.at(1),
            week: predicted.at(7),
            month: predicted.at(-1)
        }
    }

    useEffect(() => {
        if (predicted) {
            setPredictions(getNextPredictions(predicted))
        }
    }, [predicted])

    return {predictions: predictions}
}