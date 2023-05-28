import {Space, Table} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {ColumnsType} from "antd/es/table";
import {ICurrencyMarketData} from "../../utils/types";
import {Link} from "react-router-dom";
import {TableColumnCeil} from "../ui/table-ceil/table-column-ceil";
import {StarOutlined} from "@ant-design/icons";
import {Key, useEffect, useState} from "react";
import {uuid} from "@ant-design/plots/es/utils";
import {TableRowSelection} from "antd/es/table/interface";
import {useAppDispatch} from "../../utils/hooks/use-app-dispatch";
import {subscribeToCoin, unSubscribeFromCoin} from "../../services/thunks/user-currencies";
import {difference, intersection} from "../../utils/functions";
import {getCurrenciesWithKey} from "../../services/selectors/currencies";

const currenciesColumns: ColumnsType<ICurrencyMarketData> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (value, props) => {
            return <>
                <Space>
                    <Link to={`/coins/${props.id}`}>
                        <TableColumnCeil value={value} symbol={props.symbol} strong image={props.image}/>
                    </Link>
                </Space>
            </>
        },
    },
    {
        title: 'Цена',
        dataIndex: 'current_price',
        key: 'current_price',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        },
        sorter: (a, b) => a.current_price - b.current_price,
    },
    {
        title: 'Изменение цены 24 ч.',
        dataIndex: 'price_change_24h',
        key: 'price_change_24h',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong type={value < 0 ? 'danger' : 'success'}/>
        }
    },
    {
        title: 'Рыночная капитализация',
        dataIndex: 'market_cap',
        key: 'market_cap',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.market_cap - b.market_cap,
    },
    {
        title: 'Объём проданного',
        dataIndex: 'total_volume',
        key: 'total_volume',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.total_volume - b.total_volume,
    },
    {
        title: 'Монет в обороте',
        dataIndex: 'circulating_supply',
        key: 'circulating_supply',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        },
        sorter: (a, b) => a.circulating_supply - b.circulating_supply,
    },
];

export const CurrenciesTable = () => {
    const currencies = useAppSelector(getCurrenciesWithKey)
    const favorites = useAppSelector(state => state.userCurrencies.favourites)

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (currencies) {
            let currencyKeys = currencies.map((el: any) => (el.id))
            let favoriteKeys = favorites.map(el => (el.name))
            let intersectionKeys = intersection(currencyKeys, favoriteKeys)
            setSelectedRowKeys([...intersectionKeys])
        }
    }, [currencies, favorites])

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        let favoriteKeys = favorites.map(el=>(el.name))
        if (newSelectedRowKeys.length > favorites.length) {
            let newKey = difference(newSelectedRowKeys,favoriteKeys)
            dispatch(subscribeToCoin(newKey!.toString()));
        } else if (newSelectedRowKeys.length < favorites.length) {
            let unsubscribeKey = difference(favoriteKeys,newSelectedRowKeys)
            dispatch(unSubscribeFromCoin(unsubscribeKey!.toString()));
        }
    };

    const rowSelection: TableRowSelection<ICurrencyMarketData> = {
        selectedRowKeys,
        onChange: onSelectChange,
        columnTitle: 'Избранное',
    };

    return (
        <>
            {currencies &&
                <Table rowSelection={rowSelection}
                       sortDirections={['ascend', 'descend']}
                       dataSource={currencies}
                       columns={currenciesColumns}/>}
        </>
    )
}