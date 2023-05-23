import {Table} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {ColumnsType} from "antd/es/table";
import {ICurrency} from "../../utils/types";
import {Link} from "react-router-dom";
import {TableColumnCeil} from "../ui/table-ceil/table-column-ceil";

const currenciesColumns: ColumnsType<ICurrency> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (value, props) => {
            return (
                <Link to={`/coins/${props.id}`}>
                    <TableColumnCeil value={value} symbol={props.symbol} strong image={props.image}/>
                </Link>
            )
        },
    },
    {
        title: 'Price',
        dataIndex: 'current_price',
        key: 'current_price',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        },
        sorter: (a, b) => a.current_price - b.current_price,
    },
    {
        title: 'Price Change 24h',
        dataIndex: 'price_change_24h',
        key: 'price_change_24h',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong type={value < 0 ? 'danger' : 'success'}/>
        }
    },
    {
        title: 'Market Cap',
        dataIndex: 'market_cap',
        key: 'market_cap',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.market_cap - b.market_cap,
    },
    {
        title: 'Volume',
        dataIndex: 'total_volume',
        key: 'total_volume',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.total_volume - b.total_volume,
    },
    {
        title: 'Circulating Supply',
        dataIndex: 'circulating_supply',
        key: 'circulating_supply',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.circulating_supply - b.circulating_supply,
    },
];
export const CurrenciesTable = () => {
    const currencies = useAppSelector(state => state.currencies.currencies)
    return (
        <>
            {currencies && <Table sortDirections={['ascend','descend']} dataSource={currencies} columns={currenciesColumns}/>}
        </>
    )
}