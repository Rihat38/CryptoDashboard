import {Button, Card, Divider, Slider, Space, Typography} from "antd"
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../utils/hooks/use-app-selector";
import {getCurrencyById} from "../../../services/selectors/currencies";
import {decimalFormatter, usdFormatter} from "../../../utils/formatters";
import {Chip} from "../chip/chip";
import {CourseDynamics} from "../course-dynamics/course-dynamics";
import {PredictionCard} from "../prediction-card/prediction-card";
import React, {useEffect, useState} from "react";
import {predict} from "../../../services/thunks/currency";
import {useAppDispatch} from "../../../utils/hooks/use-app-dispatch";
import {subscribeToCoin, unSubscribeFromCoin} from "../../../services/thunks/user-currencies";

export const CoinMarketCard = () => {
    const {id} = useParams()
    const [isFavorite, setIsFavorite] = useState(false)
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)
    const currencyMarketData = useAppSelector(state => id ? getCurrencyById(state, id) : undefined)
    const currencies = useAppSelector(state => state.currencies.currencies)
    const favorites = useAppSelector(state => state.userCurrencies.favourites)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (favorites?.find(el => el.name === id))
            setIsFavorite(true)
        else setIsFavorite(false)
    }, [favorites])
    const handleClick = () => {
        if (id && currencies?.find(el => el.id === id))
            dispatch(predict(id))
    }

    const handleFollowClick = () => {
        if (id)
            dispatch(subscribeToCoin(id))
    }

    const handleUnFollowClick = () => {
        if (id && isFavorite)
            dispatch(unSubscribeFromCoin(id))
    }

    const handleLoginClick = () => {
        navigate('/login')
    }

    return (
        <>
            {currencyMarketData && <Card
                size={'default'}
            >
                <Space direction={"vertical"}>
                    <Space wrap align={"center"}>
                        <Space direction={"vertical"}>
                            <Space>
                                <Typography.Text strong>{currencyMarketData.name} Цена</Typography.Text>
                                <Typography.Text strong
                                                 type={"secondary"}>{currencyMarketData.symbol.toUpperCase()}</Typography.Text>
                            </Space>
                            <Space align={"center"}>
                                <Typography.Title
                                    level={1}
                                    style={{margin: 0}}>{usdFormatter.format(currencyMarketData.current_price)}</Typography.Title>
                                <Chip size={'medium'}
                                      type={currencyMarketData.price_change_percentage_24h > 0 ? 'success' : 'error'}>
                                    <CourseDynamics colored={false}
                                                    value={currencyMarketData.price_change_percentage_24h}/>
                                </Chip>
                            </Space>
                        </Space>
                        <Divider type={"vertical"}/>
                        {user ? <>
                            <Button size={"large"} type={"primary"} onClick={handleClick}>
                                Сделать прогноз
                            </Button>
                            <Divider type={"vertical"}/>
                            {
                                !isFavorite ? <Button size={"large"} type={"primary"} onClick={handleFollowClick}>
                                    Подписаться
                                </Button> : <Button size={"large"} type={"primary"} onClick={handleUnFollowClick}>
                                    Отписаться
                                </Button>
                            }
                        </> : <Button onClick={handleLoginClick}>Авторизоваться</Button>}
                    </Space>
                    <Divider/>
                    <Space align={"start"} wrap>
                        <Space direction={"vertical"} size={"large"}>
                            <Space>
                                <Space.Compact direction={'vertical'}>
                                    <Typography.Text strong type={"secondary"}>Капитализация</Typography.Text>
                                    <Space>
                                        <Typography.Text
                                            strong>{usdFormatter.format(currencyMarketData.market_cap)}</Typography.Text>
                                        <CourseDynamics size={'small'}
                                                        value={currencyMarketData.market_cap_change_percentage_24h}/>
                                    </Space>
                                </Space.Compact>
                                <Divider type={"vertical"}/>
                                <Space.Compact direction={'vertical'}>
                                    <Typography.Text strong type={"secondary"}>
                                        <Space>
                                            Объём проданного
                                            <Chip size={'small'}>24 ч.</Chip>
                                        </Space>
                                    </Typography.Text>
                                    <Space>
                                        <Typography.Text
                                            strong>{usdFormatter.format(currencyMarketData.total_volume)}</Typography.Text>
                                    </Space>
                                </Space.Compact>
                            </Space>
                            <Space>
                                <Typography.Text strong>Мин. :</Typography.Text>
                                <Typography.Text
                                    strong>{usdFormatter.format(currencyMarketData.low_24h)}</Typography.Text>
                                <Slider
                                    style={{width: 150}}
                                    max={currencyMarketData.high_24h}
                                    min={currencyMarketData.low_24h}
                                    disabled={true}
                                    value={currencyMarketData.current_price}/>
                                <Typography.Text strong>Макс. :</Typography.Text>
                                <Typography.Text
                                    strong>{usdFormatter.format(currencyMarketData.high_24h)}</Typography.Text>
                                <Chip size={'small'}><Typography.Text strong type={"secondary"}>24
                                    ч.</Typography.Text></Chip>
                            </Space>
                        </Space>
                        <Divider type={"vertical"}/>
                        <Space.Compact direction={'vertical'}>
                            <Typography.Text strong type={"secondary"}>Монет в обороте</Typography.Text>
                            <Space>
                                <Typography.Text
                                    strong>{decimalFormatter.format(currencyMarketData.circulating_supply)} {currencyMarketData.symbol.toUpperCase()}</Typography.Text>
                            </Space>
                            <Divider/>
                            <Space.Compact direction={"vertical"}>
                                <Space align={"center"}>
                                    <Typography.Text strong type={"secondary"}>Макс. оборот:</Typography.Text>
                                    <Typography.Text
                                        strong>{decimalFormatter.format(currencyMarketData.max_supply)} {currencyMarketData.symbol.toUpperCase()}</Typography.Text>
                                </Space>
                                <Space align={"center"}>
                                    <Typography.Text strong type={"secondary"}>Всего создано:</Typography.Text>
                                    <Typography.Text
                                        strong>{decimalFormatter.format(currencyMarketData.total_supply)} {currencyMarketData.symbol.toUpperCase()}</Typography.Text>
                                </Space>
                            </Space.Compact>
                        </Space.Compact>
                    </Space>
                </Space>
            </Card>}
        </>
    )
}