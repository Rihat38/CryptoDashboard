import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {Card, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/use-app-selector";
import {usePredictions} from "../../../utils/hooks/use-predictions";
import {ICurrencyOHLC} from "../../../utils/types";

const tabList = [
    {
        key: 'tomorrow',
        tab: 'На завтра',
    },
    {
        key: 'week',
        tab: 'Через неделю',
    },
    {
        key: 'month',
        tab: 'Через месяц',
    },
];

export const PredictionCard = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>('tomorrow');
    const {currencyOHLC,predicted} = useAppSelector(state => state.currencyOhlc)
    const {predictions} = usePredictions(predicted)
    const [contentList, setContentList] = useState({
        'tomorrow': <></>,
        'week': <></>,
        'month': <></>,
    })

    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    const renderTabContent = (prediction: ICurrencyOHLC) => {
        if (currencyOHLC && currencyOHLC.length > 0 && prediction) {
            let currentPrice = currencyOHLC.at(-1)!.price
            console.log(currentPrice)
            let nextPrice = currentPrice - prediction.price

            return (
                <Space style={{width: '100%'}}>
                    <Typography.Text strong>{prediction.name}</Typography.Text>
                    <Space>
                        <Typography.Text type={currentPrice < prediction.price? 'success' : 'danger'}>
                            {currentPrice < prediction.price ? `+${-nextPrice}` : -nextPrice}
                        </Typography.Text>
                        {currentPrice < prediction.price ?
                            <UpOutlined/> : <DownOutlined/>}
                    </Space>
                </Space>
            )
        }

        return <></>
    }

    useEffect(() => {
        if (predictions && currencyOHLC) {
            setContentList({
                tomorrow: renderTabContent(predictions.tomorrow!),
                week: renderTabContent(predictions.week!),
                month: renderTabContent(predictions.month!)
            })
        }
    }, [predictions, currencyOHLC])

    return (
        <>
            <Card
                size={'small'}
                title="Прогноз"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
            >
                {contentList[activeTabKey as 'tomorrow' | 'week' | 'month']}
            </Card>
        </>
    )
}

