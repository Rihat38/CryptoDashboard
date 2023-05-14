import {useParams} from "react-router-dom";
import {CryptoChart} from "../../components/crypto-chart/crypto-chart";
import {useAppDispatch} from "../../utils/hooks/use-app-dispatch";
import {getCurrencyOHLC} from "../../services/thunks/currency";
import {useEffect} from "react";

export const CoinPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCurrencyOHLC(id!))
    }, [dispatch]);

    return (
        <>
            <CryptoChart/>
        </>
    )
}