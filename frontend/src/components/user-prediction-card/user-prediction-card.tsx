import {ICurrencyOHLC} from "../../utils/types";
import {Card, Divider, Space, Statistic} from "antd";
import {usePredictions} from "../../utils/hooks/use-predictions";
import {TableColumnCeil} from "../ui/table-ceil/table-column-ceil";
import {InfoCard} from "../ui/info-card/info-card";

interface IUserPredictionCardProps {
    predicted: ICurrencyOHLC[]
}

export const UserPredictionCard = ({predicted}: IUserPredictionCardProps) => {
    const {predictions} = usePredictions(predicted)

    if (!predictions) return null
    return (
        <Space wrap>
            <InfoCard title={predictions.tomorrow?.time!} value={predictions.tomorrow?.price!}/>
            <Divider type={"vertical"}/>
            <InfoCard title={predictions.week?.time!} value={predictions.week?.price!}/>
            <Divider type={"vertical"}/>
            <InfoCard title={predictions.month?.time!} value={predictions.month?.price!}/>
        </Space>
    )
}