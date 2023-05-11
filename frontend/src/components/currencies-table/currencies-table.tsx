import {Table} from "antd";
import {currenciesColumns} from "../../data/table-columns/table-columns";
import {useAppSelector} from "../../utils/hooks/use-app-selector";

export const CurrenciesTable = () => {
    const currencies = useAppSelector(state => state.currencies.currencies)
    return (
        <>
            {currencies && <Table dataSource={currencies} pagination={false} columns={currenciesColumns}/>}
        </>
    )
}