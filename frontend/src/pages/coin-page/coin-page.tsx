import {useParams} from "react-router-dom";

export const CoinPage = () => {
    const {id} = useParams()
    return (
        <>
            Coin page id-{id}
        </>
    )
}