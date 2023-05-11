import {ICurrency} from "../../utils/types";
import {ColumnsType} from "antd/es/table";
import {Typography} from 'antd';
import {TableColumnCeil} from "../../components/ui/table-ceil/table-column-ceil";


export const currenciesColumns: ColumnsType<ICurrency> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (value, props) => {
            return <TableColumnCeil value={value} symbol={props.symbol} strong image={props.image}/>
        }
    },
    {
        title: 'Price',
        dataIndex: 'current_price',
        key: 'current_price',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        }
    },
    {
        title: 'Price Change 24h',
        dataIndex: 'price_change_24h',
        key: 'price_change_24h',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong type={value < 0 ? 'success' : 'danger'}/>
        }
    },
    {
        title: 'Market Cap',
        dataIndex: 'market_cap',
        key: 'market_cap',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        }
    },
    {
        title: 'Volume',
        dataIndex: 'total_volume',
        key: 'total_volume',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        }
    },
    {
        title: 'Circulating Supply',
        dataIndex: 'circulating_supply',
        key: 'circulating_supply',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        }
    },
];
