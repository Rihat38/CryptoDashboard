import {Space, Table} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {ColumnsType} from "antd/es/table";
import {TableColumnCeil} from "../ui/table-ceil/table-column-ceil";
import {useEffect, useState} from "react";
import {uuid} from "@ant-design/plots/es/utils";
import {UserPredictionCard} from "../user-prediction-card/user-prediction-card";

const currenciesColumns: ColumnsType<any> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (value) => {
            return <>
                <Space>
                    <TableColumnCeil value={value}/>
                </Space>
            </>
        },
    },
    {
        title: 'Время предсказания',
        dataIndex: 'forecast_date',
        key: 'forecast_date',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        },
    },
    {
        title: 'Предсказанная цена',
        dataIndex: 'forecast',
        key: 'forecast',
        render: (value) => {
            console.log(value)
            return <UserPredictionCard predicted={value}/>
        }
    },
];

export const PredictionsTable = () => {
    const predicted = useAppSelector(state => state.userPredictions)
    const [dataSource, setDataSource] = useState<any[]>()

    useEffect(() => {
        if (predicted) {
            formatData()
        }
    }, [predicted])

    const formatData = () => {
        let predictionsForecasts = predicted.predictions.map(el => ({
            'date': el.forecast_date,
            'forecast': JSON.parse(el.forecast)
        }))
        let rows = predictionsForecasts.map(el => ({
            'key': uuid(),
            'name': el.forecast[0].name,
            'forecast_date': el.date,
            'forecast': el.forecast
        }))
        setDataSource([...rows])
    }

    return (
        <>
            {dataSource &&
                <Table sortDirections={['ascend', 'descend']}
                       dataSource={dataSource}
                       columns={currenciesColumns}
                />}
        </>
    )
}
